import check from 'truetype'
import param from 'queryfetch'
import 'promise-polyfill'
import 'whatwg-fetch'
import 'setimmediate'

const async = {
	immediate: setImmediate,

	promise(fn) {
		return new Promise(fn)
	},

	fetch(url, cfg = {}) {
		cfg.method = cfg.method || 'get'

		if (cfg.hasOwnProperty('body'))
			if (check(cfg.body).isObject())
				if (cfg.method === 'get') {
					let qs = param.serialize(cfg.body)
					url += `?${qs}`
					delete cfg.body
				} else {
					let form = param.form(cfg.body)
					cfg.body = form
				}

		return fetch(url, cfg).then(resp => {
			if (resp.ok && resp.status >= 200 && resp.status < 300)
				return resp

			let error = new Error(resp.statusText)
			error.response = resp
			throw error
		})
	},

	json(url, cfg) {
		return async.fetch(url, cfg).then(resp => resp.json())
	},

	text(url, cfg) {
		return async.fetch(url, cfg).then(resp => resp.text())
	},

	bool(url, cfg) {
		return async.text(url, cfg).then(JSON.parse).then(Boolean)
	},

	num(url, cfg) {
		return async.text(url, cfg).then(Number)
	},

	float(url, cfg) {
		return async.num(url, cfg).then(parseFloat)
	},

	int(url, cfg) {
		return async.num(url, cfg).then(parseInt)
	},

	xml(url, cfg) {
		return async.text(url, cfg).then(text => {
			let dom = new DOMParser
			return dom.parseFromString(text, 'application/xml')
		})
	},

	html(url, cfg) {
		return async.text(url, cfg).then(text => {
			let dom = new DOMParser
			return dom.parseFromString(text, 'text/html')
		})
	}
}

export default async
