# polyasync

Simple JS module for Promise and Fetch APIs, with some abstraction and polyfills to support all browsers

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

## Methods

### polyasync.immadiate(fn, ...args)

Returns a `setImmediate` object if available or uses [setimmediate](https://www.npmjs.com/package/setimmediate) polyfill to emulate if needed.

```javascript
polyasync.immadiate(executeMyFunc, arg1, arg2, ...args)
```

### polyasync.promise(fn)

Returns a `new Promise(fn)` object if available or uses [promise-polyfill](https://www.npmjs.com/package/promise-polyfill) to emulate if needed.

```javascript
polyasync.promise((done, fail) => {
	// async code goes here
}).then(done).catch(fail)
```

### polyasync.fetch(url, cfg)

Returns a Fetch API object if available or uses [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) polyfill if needed.

Fetch API returns a Promise that resolves on HTTP response or rejects on HTTP error.

```javascript
polyasync.fetch(url, cfg).then(done).catch(fail)
```

The `url` parameter is a simple URL string and the `cfg` parameter needs to be an object like any one used for Fetch API itself. But, some little and useful abstractions are applied to simplify **polysync** usage.

If you want to send parameters on your request, just add a `body` in `cfg` containing a literal object with all your `key:value` pairs for any HTTP method request.

If your request is a `GET`, then `cfg.body` will be serialized into a query string, else it will be converted to a FormData object.

**polyasync** uses [queryfetch](https://www.npmjs.com/package/queryfetch) to convert `cfg.body` into query string or FormData to send it with Fetch API request.

It also tests the response and throw an error for any HTTP status >= 300. The error will cause a Promise rejection and can be catched.

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

Makes a `polyasync.fetch` and waits a **JSON** return to parse and send the result to resolved response.

```javascript
polyasync.json(url, cfg)
	.then(json => console.dir(json))
	.catch(e => console.error(e.message))
```

### polyasync.text(url, cfg)

Makes a `polyasync.fetch` and sends a **text** return to resolved response.

```javascript
polyasync.text(url, cfg)
	.then(text => console.log(text))
	.catch(e => console.error(e.message))
```

### polyasync.bool(url, cfg)

Makes a `polyasync.text` and parses response as a **boolean** to return it to resolved response.

```javascript
polyasync.bool(url, cfg)
	.then(bool => console.log(bool))
	.catch(e => console.error(e.message))
```

### polyasync.num(url, cfg)

Makes a `polyasync.text` and parses response as a **number** to return it to resolved response.

```javascript
polyasync.num(url, cfg)
	.then(num => console.log(num))
	.catch(e => console.error(e.message))
```

### polyasync.float(url, cfg)

Makes a `polyasync.num` and parses reponse as a **float** to return it to resolved response.

```javascript
polyasync.float(url, cfg)
	.then(float => console.log(float))
	.catch(e => console.error(e.message))
```

### polyasync.int(url, cfg)

Makes a `polyasync.num` and parses reponse as an **integer** to return it to resolved response.

```javascript
polyasync.int(url, cfg)
	.then(int => console.log(int))
	.catch(e => console.error(e.message))
```

### polyasync.xml(url, cfg)

Makes a `polyasync.text` and parses reponse as a **XML** document to return it to resolved response.

```javascript
polyasync.xml(url, cfg)
	.then(xml => console.dir(xml))
	.catch(e => console.error(e.message))
```

### polyasync.html(url, cfg)

Makes a `polyasync.text` and parses reponse as a **HTML** document to return it to resolved response.

```javascript
polyasync.html(url, cfg)
	.then(html => console.dir(html))
	.catch(e => console.error(e.message))
```
