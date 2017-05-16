# polyasync

Simple JS module for Promise and Fetch APIs, with some abstraction and a polyfill to support Fetch API when needed.

Some global native resources are required, like `Promise`. If it is not available at your global enviroment you can use a polyfill to support it. I recomend [core-js](https://www.npmjs.com/package/core-js) for a complete global enviroment solution.

***

## Installation

Install **polyasync** with Bower or NPM.

### Bower

`bower i -S polyasync`

### NPM

`npm i -S polyasync`

With **JSPM** you can install **polyasync** from NPM:

`jspm i polyasync=npm:polyasync`

## Usage

It's possible to use **polyasync** with module loaders or globally.

### ES6

`import polyasync from 'polyasync'`

### CommonJS

`let polyasync = require('polyasync')`

### AMD

```javascript
require(['polyasync'], (polyasync) => {
    // code goes here
})
```

### Global

```html
<script src="path/to/polyasync.umd.js"></script>
```

It's also possible to get it from the great UNPKG CDN:

```html
<script src="https://unpkg.com/polyasync"></script>
```

## Basic methods

### polyasync.asap(fn, ...args)

This method tries to return a `setImmediate` object if available at global enviroment, else it simply emulates with `setTimeout`.

```javascript
polyasync.asap(executeMyFunc, arg1, arg2, ...args)
```

### polyasync.exec(fn)

Returns a `new Promise(fn)` object just for convenience.

```javascript
polyasync.exec((done, fail) => {
	// async code here
}).then(done).catch(fail)
```

### polyasync.fetch(url, cfg)

Returns a Fetch API object if available or uses [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) polyfill if needed.

Fetch API returns a Promise that resolves on HTTP response or rejects on HTTP error.

```javascript
polyasync.fetch(url, cfg).then(done).catch(fail)
```

The `url` parameter is a simple URL string and the `cfg` parameter needs to be an object like any used for Fetch API itself. But, some little and useful abstractions are applied to simplify **polysync** usage.

If you want to send parameters on your request, just add a `body` in `cfg` containing a literal object with all your `key:value` pairs for any HTTP method request.

If your request is a `GET` (default), then `cfg.body` will be serialized into a query string, else it will be converted to a FormData object.

**polyasync** uses [queryfetch](https://www.npmjs.com/package/queryfetch) to convert `cfg.body` into query string or FormData to send it with Fetch API request.

It is also possible to send JSON content. Just set a `cfg.headers` key `'Content-type'` with `'application/json'` value. Then your `cfg.body` literal object will be serialized using `JSON.stringify`.

**polyasync** tests HTTP response for any error status >= 300. The error will cause a Promise rejection and can be catched.

```javascript
polyasync.fetch('an URL here', {
	method: 'post',
	body: {
		foo: 'bar',
		lorem: 'ipsum'
	}
}).then(resp => {
	// do your magic
}).catch(error => {
	// or not...
})
```

## Useful abstracted methods

### polyasync.json(url, cfg)

Executes a `polyasync.fetch` and expects a **JSON** return to parse and send the result to resolved response.

```javascript
polyasync.json(url, cfg)
	.then(json => console.dir(json))
	.catch(e => console.error(e.message))
```

### polyasync.text(url, cfg)

Executes a `polyasync.fetch` and returns resolved response as **text**.

```javascript
polyasync.text(url, cfg)
	.then(text => console.log(text))
	.catch(e => console.error(e.message))
```

### polyasync.bool(url, cfg)

Executes a `polyasync.text` and tries to parse the response as **boolean** to resolve it.

```javascript
polyasync.bool(url, cfg)
	.then(bool => console.log(bool))
	.catch(e => console.error(e.message))
```

### polyasync.num(url, cfg)

Executes a `polyasync.text` and tries to parse the response as **number** to resolve it.

```javascript
polyasync.num(url, cfg)
	.then(num => console.log(num))
	.catch(e => console.error(e.message))
```

### polyasync.float(url, cfg)

Executes a `polyasync.num` and tries to parse the reponse as **float** to resolve it.

```javascript
polyasync.float(url, cfg)
	.then(float => console.log(float))
	.catch(e => console.error(e.message))
```

### polyasync.int(url, cfg)

Executes a `polyasync.num` and tries to parse the reponse as **integer** to resolve it.

```javascript
polyasync.int(url, cfg)
	.then(int => console.log(int))
	.catch(e => console.error(e.message))
```

### polyasync.xml(url, cfg)

Executes a `polyasync.text` and tries to parse the reponse as **XML** document to resolve it.

```javascript
polyasync.xml(url, cfg)
	.then(xml => console.dir(xml))
	.catch(e => console.error(e.message))
```

### polyasync.html(url, cfg)

Executes a `polyasync.text` and tries to parse the reponse as **HTML** document to resolve it.

```javascript
polyasync.html(url, cfg)
	.then(html => console.dir(html))
	.catch(e => console.error(e.message))
```

### polyasync.all(urls, cfg, type)

Executes a request for each url in the `urls` Array using the same optional `cfg` object for all. The `type` argument is an optional string to define what **polyasync** action will request `urls`. Only `urls` argument is mandatory, `cfg` default is `{ method: 'get' }` and `type` is `fetch`.

It works with `Promise.all` and resolves an array with the results or rejects if any request fails.

```javascript
const urls = [...] // a list of urls

polyasync.all(urls, {}, 'json')
	.then(results => console.dir(results))
	.catch(e => console.error(e.message))
```
