(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('async', factory) :
  (global.async = factory());
}(this, function () { 'use strict';

  var TrueType = function TrueType(x) {
  	try {
  		this.item = x
  	} catch(e) {
  		this.item = undefined
  	}
  };

  TrueType.prototype.toString = function toString () {
  	return Object.prototype.toString.call(this.item).substr(8).replace(']', '')
  };

  TrueType.prototype.instance = function instance () {
  	return this.item.constructor.name
  };

  TrueType.prototype.isObject = function isObject () {
  	return this.toString() === 'Object'
  };

  TrueType.prototype.isArray = function isArray () {
  	return this.toString() === 'Array'
  };

  TrueType.prototype.isString = function isString () {
  	return this.toString() === 'String'
  };

  TrueType.prototype.isBoolean = function isBoolean () {
  	return this.toString() === 'Boolean'
  };

  TrueType.prototype.isDate = function isDate () {
  	return this.toString() === 'Date'
  };

  TrueType.prototype.isRegExp = function isRegExp () {
  	return this.toString() === 'RegExp'
  };

  TrueType.prototype.isNull = function isNull () {
  	return this.toString() === 'Null'
  };

  TrueType.prototype.isDefined = function isDefined () {
  	return this.toString() !== 'Undefined'
  };

  TrueType.prototype.isNumber = function isNumber () {
  	return this.toString() === 'Number'
  };

  TrueType.prototype.isInt = function isInt () {
  	if (this.isNumber())
  		return this.item === parseInt(this.item)
  	else
  		return false
  };

  TrueType.prototype.isFloat = function isFloat () {
  	if (this.isNumber())
  		return this.item !== parseInt(this.item)
  	else
  		return false
  };

  TrueType.prototype.is = function is (type) {
  	switch (type) {
  		case 'Int':
  			return this.isInt()
  		case 'Float':
  			return this.isFloat()
  		default:
  			return this.toString() === type || this.toInstance() === type
  	}
  };

  function ttype (x) { return new TrueType(x); }

  /*!
   * @overview es6-promise - a tiny implementation of Promises/A+.
   * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
   * @license   Licensed under MIT license
   *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
   * @version   3.2.2+35df15ea
   */

  (function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){G=t}function r(t){Q=t}function o(){return function(){process.nextTick(a)}}function i(){return function(){B(a)}}function s(){var t=0,e=new X(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){t.port2.postMessage(0)}}function c(){return function(){setTimeout(a,1)}}function a(){for(var t=0;J>t;t+=2){var e=tt[t],n=tt[t+1];e(n),tt[t]=void 0,tt[t+1]=void 0}J=0}function f(){try{var t=require,e=t("vertx");return B=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[rt]&&k(r);var o=n._state;if(o){var i=arguments[o-1];Q(function(){x(o,r,i,n._result)})}else E(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function _(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function v(t){try{return t.then}catch(e){return ut.error=e,ut}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){Q(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===it?S(t,e._result):e._state===st?j(t,e._result):E(e,void 0,function(e){g(t,e)},function(e){j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===et&&constructor.resolve===nt?b(t,n):r===ut?j(t,ut.error):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,_()):t(n)?w(e,n,v(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===ot&&(t._result=e,t._state=it,0!==t._subscribers.length&&Q(T,t))}function j(t,e){t._state===ot&&(t._state=st,t._result=e,Q(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+it]=n,o[i+st]=r,0===i&&t._state&&Q(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r,o,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return ct.error=n,ct}}function x(t,n,r,o){var i,s,u,c,a=e(r);if(a){if(i=P(r,o),i===ct?(c=!0,s=i.error,i=null):u=!0,n===i)return void j(n,d())}else i=o,u=!0;n._state!==ot||(a&&u?g(n,i):c?j(n,s):t===it?S(n,i):t===st&&j(n,i))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return at++}function k(t){t[rt]=at++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t){return new _t(this,t).promise}function q(t){var e=this;return new e(I(t)?function(n,r){for(var o=t.length,i=0;o>i;i++)e.resolve(t[i]).then(n,r)}:function(t,e){e(new TypeError("You must pass an array to race."))})}function F(t){var e=this,n=new e(p);return j(n,t),n}function D(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function K(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function L(t){this[rt]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&D(),this instanceof L?C(this,t):K())}function N(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[rt]||k(this.promise),I(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,U())}function U(){return new Error("Array Methods must be provided an Array")}function W(){var t;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(t.Promise=pt)}var z;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B,G,H,I=z,J=0,Q=function(t,e){tt[J]=t,tt[J+1]=e,J+=2,2===J&&(G?G(a):H())},R="undefined"!=typeof window?window:void 0,V=R||{},X=V.MutationObserver||V.WebKitMutationObserver,Z="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),$="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,tt=new Array(1e3);H=Z?o():X?s():$?u():void 0===R&&"function"==typeof require?f():c();var et=l,nt=h,rt=Math.random().toString(36).substring(16),ot=void 0,it=1,st=2,ut=new M,ct=new M,at=0,ft=Y,lt=q,ht=F,pt=L;L.all=ft,L.race=lt,L.resolve=nt,L.reject=ht,L._setScheduler=n,L._setAsap=r,L._asap=Q,L.prototype={constructor:L,then:et,"catch":function(t){return this.then(null,t)}};var _t=N;N.prototype._enumerate=function(){
  var this$1 = this;
  for(var t=this.length,e=this._input,n=0;this._state===ot&&t>n;n++)this$1._eachEntry(e[n],n)},N.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===nt){var o=v(t);if(o===et&&t._state!==ot)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===pt){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){e(t)}),e)}else this._willSettleAt(r(t),e)},N.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===ot&&(this._remaining--,t===st?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},N.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){n._settledAt(it,e,t)},function(t){n._settledAt(st,e,t)})};var dt=W,vt={Promise:pt,polyfill:dt};"function"==typeof define&&define.amd?define(function(){return vt}):"undefined"!=typeof module&&module.exports?module.exports=vt:"undefined"!=typeof this&&(this.ES6Promise=vt),dt()}).call(ttype(self).isDefined() ? self : this);

  (function(self) {
    'use strict';

    if (self.fetch) {
      return
    }

    var support = {
      searchParams: 'URLSearchParams' in self,
      iterable: 'Symbol' in self && 'iterator' in Symbol,
      blob: 'FileReader' in self && 'Blob' in self && (function() {
        try {
          new Blob()
          return true
        } catch(e) {
          return false
        }
      })(),
      formData: 'FormData' in self,
      arrayBuffer: 'ArrayBuffer' in self
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = String(name)
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name')
      }
      return name.toLowerCase()
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = String(value)
      }
      return value
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
      var iterator = {
        next: function() {
          var value = items.shift()
          return {done: value === undefined, value: value}
        }
      }

      if (support.iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator
        }
      }

      return iterator
    }

    function Headers(headers) {
      this.map = {}

      if (headers instanceof Headers) {
        headers.forEach(function(value, name) {
          this.append(name, value)
        }, this)

      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function(name) {
          this.append(name, headers[name])
        }, this)
      }
    }

    Headers.prototype.append = function(name, value) {
      name = normalizeName(name)
      value = normalizeValue(value)
      var list = this.map[name]
      if (!list) {
        list = []
        this.map[name] = list
      }
      list.push(value)
    }

    Headers.prototype['delete'] = function(name) {
      delete this.map[normalizeName(name)]
    }

    Headers.prototype.get = function(name) {
      var values = this.map[normalizeName(name)]
      return values ? values[0] : null
    }

    Headers.prototype.getAll = function(name) {
      return this.map[normalizeName(name)] || []
    }

    Headers.prototype.has = function(name) {
      return this.map.hasOwnProperty(normalizeName(name))
    }

    Headers.prototype.set = function(name, value) {
      this.map[normalizeName(name)] = [normalizeValue(value)]
    }

    Headers.prototype.forEach = function(callback, thisArg) {
      Object.getOwnPropertyNames(this.map).forEach(function(name) {
        this.map[name].forEach(function(value) {
          callback.call(thisArg, value, name, this)
        }, this)
      }, this)
    }

    Headers.prototype.keys = function() {
      var items = []
      this.forEach(function(value, name) { items.push(name) })
      return iteratorFor(items)
    }

    Headers.prototype.values = function() {
      var items = []
      this.forEach(function(value) { items.push(value) })
      return iteratorFor(items)
    }

    Headers.prototype.entries = function() {
      var items = []
      this.forEach(function(value, name) { items.push([name, value]) })
      return iteratorFor(items)
    }

    if (support.iterable) {
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries
    }

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'))
      }
      body.bodyUsed = true
    }

    function fileReaderReady(reader) {
      return new Promise(function(resolve, reject) {
        reader.onload = function() {
          resolve(reader.result)
        }
        reader.onerror = function() {
          reject(reader.error)
        }
      })
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader()
      reader.readAsArrayBuffer(blob)
      return fileReaderReady(reader)
    }

    function readBlobAsText(blob) {
      var reader = new FileReader()
      reader.readAsText(blob)
      return fileReaderReady(reader)
    }

    function Body() {
      this.bodyUsed = false

      this._initBody = function(body) {
        this._bodyInit = body
        if (typeof body === 'string') {
          this._bodyText = body
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this._bodyText = body.toString()
        } else if (!body) {
          this._bodyText = ''
        } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
          // Only support ArrayBuffers for POST method.
          // Receiving ArrayBuffers happens via Blobs, instead.
        } else {
          throw new Error('unsupported BodyInit type')
        }

        if (!this.headers.get('content-type')) {
          if (typeof body === 'string') {
            this.headers.set('content-type', 'text/plain;charset=UTF-8')
          } else if (this._bodyBlob && this._bodyBlob.type) {
            this.headers.set('content-type', this._bodyBlob.type)
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
          }
        }
      }

      if (support.blob) {
        this.blob = function() {
          var rejected = consumed(this)
          if (rejected) {
            return rejected
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob)
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob')
          } else {
            return Promise.resolve(new Blob([this._bodyText]))
          }
        }

        this.arrayBuffer = function() {
          return this.blob().then(readBlobAsArrayBuffer)
        }

        this.text = function() {
          var rejected = consumed(this)
          if (rejected) {
            return rejected
          }

          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob)
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text')
          } else {
            return Promise.resolve(this._bodyText)
          }
        }
      } else {
        this.text = function() {
          var rejected = consumed(this)
          return rejected ? rejected : Promise.resolve(this._bodyText)
        }
      }

      if (support.formData) {
        this.formData = function() {
          return this.text().then(decode)
        }
      }

      this.json = function() {
        return this.text().then(JSON.parse)
      }

      return this
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

    function normalizeMethod(method) {
      var upcased = method.toUpperCase()
      return (methods.indexOf(upcased) > -1) ? upcased : method
    }

    function Request(input, options) {
      options = options || {}
      var body = options.body
      if (Request.prototype.isPrototypeOf(input)) {
        if (input.bodyUsed) {
          throw new TypeError('Already read')
        }
        this.url = input.url
        this.credentials = input.credentials
        if (!options.headers) {
          this.headers = new Headers(input.headers)
        }
        this.method = input.method
        this.mode = input.mode
        if (!body) {
          body = input._bodyInit
          input.bodyUsed = true
        }
      } else {
        this.url = input
      }

      this.credentials = options.credentials || this.credentials || 'omit'
      if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers)
      }
      this.method = normalizeMethod(options.method || this.method || 'GET')
      this.mode = options.mode || this.mode || null
      this.referrer = null

      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests')
      }
      this._initBody(body)
    }

    Request.prototype.clone = function() {
      return new Request(this)
    }

    function decode(body) {
      var form = new FormData()
      body.trim().split('&').forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=')
          var name = split.shift().replace(/\+/g, ' ')
          var value = split.join('=').replace(/\+/g, ' ')
          form.append(decodeURIComponent(name), decodeURIComponent(value))
        }
      })
      return form
    }

    function headers(xhr) {
      var head = new Headers()
      var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
      pairs.forEach(function(header) {
        var split = header.trim().split(':')
        var key = split.shift().trim()
        var value = split.join(':').trim()
        head.append(key, value)
      })
      return head
    }

    Body.call(Request.prototype)

    function Response(bodyInit, options) {
      if (!options) {
        options = {}
      }

      this.type = 'default'
      this.status = options.status
      this.ok = this.status >= 200 && this.status < 300
      this.statusText = options.statusText
      this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
      this.url = options.url || ''
      this._initBody(bodyInit)
    }

    Body.call(Response.prototype)

    Response.prototype.clone = function() {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      })
    }

    Response.error = function() {
      var response = new Response(null, {status: 0, statusText: ''})
      response.type = 'error'
      return response
    }

    var redirectStatuses = [301, 302, 303, 307, 308]

    Response.redirect = function(url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code')
      }

      return new Response(null, {status: status, headers: {location: url}})
    }

    self.Headers = Headers
    self.Request = Request
    self.Response = Response

    self.fetch = function(input, init) {
      return new Promise(function(resolve, reject) {
        var request
        if (Request.prototype.isPrototypeOf(input) && !init) {
          request = input
        } else {
          request = new Request(input, init)
        }

        var xhr = new XMLHttpRequest()

        function responseURL() {
          if ('responseURL' in xhr) {
            return xhr.responseURL
          }

          // Avoid security warnings on getResponseHeader when not allowed by CORS
          if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL')
          }

          return
        }

        xhr.onload = function() {
          var options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: headers(xhr),
            url: responseURL()
          }
          var body = 'response' in xhr ? xhr.response : xhr.responseText
          resolve(new Response(body, options))
        }

        xhr.onerror = function() {
          reject(new TypeError('Network request failed'))
        }

        xhr.ontimeout = function() {
          reject(new TypeError('Network request failed'))
        }

        xhr.open(request.method, request.url, true)

        if (request.credentials === 'include') {
          xhr.withCredentials = true
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob'
        }

        request.headers.forEach(function(value, name) {
          xhr.setRequestHeader(name, value)
        })

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
      })
    }
    self.fetch.polyfill = true
  })(ttype(self).isDefined() ? self : this);

  var queryfetch = {}

  queryfetch.serialize = function (obj, pre) {
  	var keys = Object.keys(obj),
  		pairs = keys.map(function (k) {
  			var item = obj[k],
  				p = pre ? (pre + "[" + k + "]") : k

  			return item instanceof Object ?
  				queryfetch.serialize(item, p) : [p, item].map(encodeURIComponent).join('=')
  		})
  	return pairs.join('&')
  }

  queryfetch.parse = function (qs) {
  	var data = {},
  		query = qs.startsWith('?') ? qs.substr(1) : qs,
  		pairs = query.replace(/(;+|&+)/g, '&').split('&')

  	pairs.forEach(function (pair) {
  		var ref = pair.split('=').map(decodeURIComponent);
  		var k = ref[0];
  		var v = ref[1];

  		if (!k)
  			return 0

  		v = !v ? null : !isNaN(v) ? new Number(v).valueOf() : v

  		if (!k.includes('['))
  			return data[k] = !data.hasOwnProperty(k) ? v :
  				Array.isArray(data[k]) ? data[k].push(v) : [data[k], v]

  		var ref$1 = k.split('[');
  		var o = ref$1[0];
  		var t = ref$1[1];
  		var key = t ? t.replace(']', '') : 0,
  			arr = !isNaN(key),
  			pos = !key ? 0 : arr ? parseInt(key) : key

  		data[o] = data.hasOwnProperty(o) ? data[o] : arr ? [] : {}

  		return !pos ? data[o].push(v) : data[o][pos] = v
  	})

  	return data
  }

  queryfetch.form = function (o) {
  	if (typeof FormData === 'undefined')
  		return console.error('FormData not supported')

  	if (o instanceof FormData)
  		return o

  	if (typeof HTMLFormElement !== 'undefined')
  		if (o instanceof HTMLFormElement)
  			return new FormData(o)

  	if (o instanceof Object) {
  		var form = new FormData
  		try {
  			for (var k in o)
  				if (o.hasOwnProperty(k))
  					form.append(k, o[k])
  		} catch (e) {
  			console.error(e.message)
  		}
  		return form
  	}

  }

  var async = {
  	promise: function promise(fn) {
  		return new Promise(fn)
  	},

  	fetch: function fetch$1(url, cfg) {
  		if ( cfg === void 0 ) cfg = {};

  		cfg.method = cfg.method || 'get'

  		if (cfg.hasOwnProperty('body'))
  			if (ttype(cfg.body).isObject())
  				if (cfg.method === 'get') {
  					var qs = queryfetch.serialize(cfg.body)
  					url += "?" + qs
  					delete cfg.body
  				} else {
  					var form = queryfetch.form(cfg.body)
  					cfg.body = form
  				}

  		return fetch(url, cfg).then(function (resp) {
  			if (resp.ok && resp.status >= 200 && resp.status < 300)
  				return resp

  			var error = new Error(resp.statusText)
  			error.response = resp
  			throw error
  		})
  	},

  	json: function json(url, cfg) {
  		return async.fetch(url, cfg).then(function (resp) { return resp.json(); })
  	},

  	text: function text(url, cfg) {
  		return async.fetch(url, cfg).then(function (resp) { return resp.text(); })
  	},

  	bool: function bool(url, cfg) {
  		return async.text(url, cfg).then(JSON.parse).then(Boolean)
  	},

  	num: function num(url, cfg) {
  		return async.text(url, cfg).then(Number)
  	},

  	float: function float(url, cfg) {
  		return async.num(url, cfg).then(parseFloat)
  	},

  	int: function int(url, cfg) {
  		return async.num(url, cfg).then(parseInt)
  	},

  	xml: function xml(url, cfg) {
  		return async.text(url, cfg).then(function (text) {
  			var dom = new DOMParser
  			return dom.parseFromString(text, 'application/xml')
  		})
  	},

  	html: function html(url, cfg) {
  		return async.text(url, cfg).then(function (text) {
  			var dom = new DOMParser
  			return dom.parseFromString(text, 'text/html')
  		})
  	}
  }

  return async;

}));
