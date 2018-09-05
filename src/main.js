import params from '@jsweb/params'
import type from '@jsweb/truetype'

export default {
  exec: fn => new Promise(fn),

  execAll(arr) {
    return Promise.all(this.tasks(arr))
  },

  execRace(arr) {
    return Promise.race(this.tasks(arr))
  },

  tasks(arr) {
    return arr.map(t =>
      t instanceof Promise ? t :
      t instanceof Function ? this.exec(t) :
      Promise.resolve(t)
    )
  },

  asap(fn, ...args) {
    const ok = typeof setImmediate !== 'undefined'
    return ok ? setImmediate(fn, ...args) : setTimeout(fn, 1, ...args)
  },

  fetch(url, cfg = {}) {
    cfg.method = cfg.method ? cfg.method.toLowerCase() : 'get'

    if (cfg.method === 'get') {
      const query = cfg.body ? params(cfg.body).serialize() : ''
      url += query ? `?${query}` : ''
      delete cfg.body
    } else {
      const headers = cfg.headers || {}
      const content = Object.values(headers).find(k => /content-type/i.test(k))
      const ctype = headers[content]

      if (ctype === 'application/json') {
        cfg.body = type(cfg.body).isObject ? JSON.stringify(cfg.body) : cfg.body
      } else if (ctype === 'application/x-www-form-urlencoded') {
        cfg.body = params(cfg.body).serialize()
      } else {
        cfg.body = params(cfg.body).form()
      }
    }

    return fetch(url, cfg).then(resp => {
      if (resp.ok && resp.status >= 200 && resp.status < 300) return resp
      const error = new Error(resp.statusText)
      error.response = resp
      return Promise.reject(error)
    })
  },

  fetchAll(urls, cfg, type = 'fetch') {
    return this.execAll(
      urls.map(url => this[type](url, cfg))
    )
  },

  fetchRace(urls, cfg, type = 'fetch') {
    return this.execRace(
      urls.map(url => this[type](url, cfg))
    )
  },

  json(url, cfg) {
    return this.fetch(url, cfg).then(resp => resp.json())
  },

  text(url, cfg) {
    return this.fetch(url, cfg).then(resp => resp.text())
  },

  blob(url, cfg) {
    return this.fetch(url, cfg).then(resp => resp.blob())
  },

  bool(url, cfg) {
    return this.text(url, cfg).then(JSON.parse).then(Boolean)
  },

  num(url, cfg) {
    return this.text(url, cfg).then(Number)
  },

  float(url, cfg) {
    return this.num(url, cfg).then(parseFloat)
  },

  int(url, cfg) {
    return this.num(url, cfg).then(parseInt)
  },

  xml(url, cfg) {
    return this.text(url, cfg).then(text => {
      const dom = new DOMParser()
      return dom.parseFromString(text, 'application/xml')
    })
  },

  html(url, cfg) {
    return this.text(url, cfg).then(text => {
      const dom = new DOMParser()
      return dom.parseFromString(text, 'text/html')
    })
  }
}
