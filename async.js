import tp from './bower_components/truetype/truetype.js'
import param from './bower_components/queryfetch/queryfetch.js'
import './bower_components/es6-promise/es6-promise.min.js'
import './bower_components/fetch/fetch.js'

const async = {
	promise(fn) {
		return new Promise(fn)
	},

	fetch(url, cfg = {}) {
		cfg.method = cfg.method || 'get'

		if (cfg.hasOwnProperty('body'))
			if (tp(cfg.body).isObject())
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