import type from './bower_components/truetype/truetype.js'
import './bower_components/es6-promise/es6-promise.min.js'
import './bower_components/fetch/fetch.js'

let async = {
	promise(fn) {
		return new Promise(fn)
	},

	fetch(url, cfg = {}) {
		if (cfg.hasOwnProperty('body'))
			if (type(cfg.body).instance('Object')) {
				cfg.headers = cfg.headers || {}
				cfg.headers['Accept'] = 'application/json'
				cfg.headers['Content-Type'] = 'application/json'
				cfg.body = JSON.stringify(cfg.body)
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
