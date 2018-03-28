import qf from 'queryfetch'

class PolyAsync {
  asap(fn, ...args) {
    return typeof setImmediate !== 'undefined' ? setImmediate(fn, ...args) : setTimeout(fn, 1, ...args)
  }

  exec(fn) {
    return new Promise(fn)
  }

  tasks(array) {
    return array.map(t =>
      t instanceof Promise ? t :
      t instanceof Function ? this.exec(t) :
      Promise.resolve(t)
    )
  }

  execAll(array) {
    return Promise.all(this.tasks(array))
  }

  execRace(tasks) {
    return Promise.race(this.tasks(array))
  }

  fetch(url, cfg = {}) {
    cfg.method = cfg.method ? cfg.method.toLowerCase() : 'get'

    if (cfg.body) {
      if (cfg.method === 'get') {
        let query = qf(cfg.body).serialize()
        url += `?${query}`
        delete cfg.body
      } else {
        let headers = cfg.headers || {},
          content = Object.values(headers).find(k => /content-type/i.test(k)),
          type = headers[content]

        if (type === 'application/json') {
          cfg.body = cfg.body instanceof Object ? JSON.stringify(cfg.body) : cfg.body
        } else if (type === 'application/x-www-form-urlencoded') {
          cfg.body = qf(cfg.body).serialize()
        } else {
          cfg.body = qf(cfg.body).form()
        }
      }
    }

    return fetch(url, cfg).then(resp => {
      if (resp.ok && resp.status >= 200 && resp.status < 300)
        return resp
      const error = new Error(resp.statusText)
      error.response = resp
      return Promise.reject(error)
    })
  }

  fetchAll(urls, cfg, type = 'fetch') {
    const req = url => this[type](url, cfg)
    return this.execAll(urls.map(req))
  }

  fetchRace(urls, cfg, type = 'fetch') {
    const req = url => this[type](url, cfg)
    return this.execRace(urls.map(req))
  }

  json(url, cfg) {
    return this.fetch(url, cfg).then(resp => resp.json())
  }

  text(url, cfg) {
    return this.fetch(url, cfg).then(resp => resp.text())
  }

  blob(url, cfg) {
    return this.fetch(url, cfg).then(resp => resp.blob())
  }

  bool(url, cfg) {
    return this.text(url, cfg).then(JSON.parse).then(Boolean)
  }

  num(url, cfg) {
    return this.text(url, cfg).then(Number)
  }

  float(url, cfg) {
    return this.num(url, cfg).then(parseFloat)
  }

  int(url, cfg) {
    return this.num(url, cfg).then(parseInt)
  }

  xml(url, cfg) {
    return this.text(url, cfg).then(text => {
      let dom = new DOMParser()
      return dom.parseFromString(text, 'application/xml')
    })
  }

  html(url, cfg) {
    return this.text(url, cfg).then(text => {
      let dom = new DOMParser()
      return dom.parseFromString(text, 'text/html')
    })
  }
}

export default new PolyAsync
