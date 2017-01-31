import qs from 'queryfetch'
import 'promise-polyfill'
import 'whatwg-fetch'
import 'setimmediate'

class PolyAsync {
	immediate(...args) {
		return setImmediate.apply(args)
	}

	promise(fn) {
		return new Promise(fn)
	}

	fetch(url, cfg = {}) {
		cfg.method = cfg.method ? cfg.method.toLowerCase() : 'get'

		if (cfg.hasOwnProperty('body')) {
			if (cfg.method === 'get') {
				let query = qs.serialize(cfg.body)
				url += `?${query}`
				delete cfg.body
			} else {
                let headers = cfg.headers || {},
                    content = headers['Content-type']
                switch (content) {
                    case 'application/json':
                        cfg.body = JSON.stringify(cfg.body)
                        break
                    case 'application/x-www-form-urlencoded':
                        cfg.body = qs.serialize(cfg.body)
                        break
                    default:
                        cfg.body = qs.form(cfg.body)
                }
			}
		}

		return fetch(url, cfg).then(resp => {
			if (resp.ok && resp.status >= 200 && resp.status < 300)
				return resp

			let error = new Error(resp.statusText)
			error.response = resp
			throw error
		})
	}

	json(url, cfg) {
		return this.fetch(url, cfg).then(resp => resp.json())
	}

	text(url, cfg) {
		return this.fetch(url, cfg).then(resp => resp.text())
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

export default new PolyAsync()
