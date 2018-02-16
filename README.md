# polyasync

Simple JS module for web applications to do async things using Promise, Fetch API and setImmediate.

Compatible with modern browsers. If you want to support older browsers, you will need polyfills for Promise and Fetch API. I recomend:

- [promise-polyfill](https://www.npmjs.com/package/promise-polyfill)
- [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch)

***

## Warning!

Now **polysync** was upgraded to version 2 and there are breaking changes.

- Fetch API polyfill was not included anymore. Modern browsers already have native support, if you need polyfill for old browsers, add it to your application.
- Module filenames were changed. If you are using path to the files or Unpkg CDN complete URL version, it is necessary to update your path strings.
- **.all(urls, cfg, type)** method was replaced by **.fetchAll(urls, cfg, type)** for semantic reasons like the brand new method **.execAll(urls, cfg, type)**

## Installation

`npm i -S polyasync`

or

`yarn add polyasync`

or

```html
<script src='https://unpkg.com/polyasync'></script>
```

## Usage

### ES6

`import polyasync from 'polyasync'`

### CommonJS

`const polyasync = require('polyasync')`

### Global

When using via `script` tag, `polyasync` object will be global available.

## Basic methods

### .asap(fn, ...args)

This method tries to return a `setImmediate` object if available at global enviroment, else it simply emulates using `setTimeout`.

```javascript
polyasync.asap(myFunction, arg1, arg2, ...args)
```

### .exec(fn)

Returns a `new Promise(fn)` object just for convenience.

```javascript
polyasync.exec((done, fail) => {
	// async code here
}).then(done).catch(fail)
```

### .fetch(url, cfg)

Returns a Fetch API object. Fetch API returns a Promise which resolves on HTTP response or rejects on HTTP error.

```javascript
polyasync.fetch(url, cfg).then(done).catch(fail)
```

Arguments expected are the same for Fetch API itself. But, some little and useful abstractions are applied to simplify **polysync** usage.

If you want to send parameters on your request, just add a `body` in `cfg` containing a literal object with all your `key:value` pairs for any HTTP method request.

If your request is a `GET` (default), then `cfg.body` will be serialized into a query string, else it will be converted to a FormData object if necessary. So you can also send HTML Form or FormData object for not `GET` requests.

**polyasync** uses [queryfetch](https://www.npmjs.com/package/queryfetch) to convert `cfg.body` into query string or FormData to send it with Fetch API request.

It is also possible to send JSON content. Just set `content-type` to `application/json` at cfg.headers. Then your `cfg.body` literal object will be serialized using `JSON.stringify`.

**polyasync** tests HTTP response for any error status >= 300. The error will cause a Promise rejection and can be catched.

```javascript
polyasync.fetch('my/url', {
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

### .execAll(array)

**New in version 2**.

Returns a `Promise.all` object with a little abstraction, just for convenience.

The `array` argument can contain Promises or executor Functions for Promises. Anything else will be parsed with `Promise.resolve`.

```javascript
const tasks = [
  new Promise(fn),
  fetch('my/url'),
  Promise.resolve(any),
  function(done, fail) { /* async code here */ },
  null
]

polyasync.execAll(tasks).then(done).catch(fail)
```

### .json(url, cfg)

Executes a `polyasync.fetch` and expects a **JSON** return to parse and return it to resolved response.

```javascript
polyasync.json(url, cfg)
	.then(json => console.dir(json))
	.catch(e => console.error(e))
```

### .text(url, cfg)

Executes a `polyasync.fetch` and returns resolved response as **text**.

```javascript
polyasync.text(url, cfg)
	.then(text => console.log(text))
	.catch(e => console.error(e))
```

### .bool(url, cfg)

Executes a `polyasync.text` and tries to parse the response as **boolean**.

```javascript
polyasync.bool(url, cfg)
	.then(bool => console.log(bool))
	.catch(e => console.error(e))
```

### .num(url, cfg)

Executes a `polyasync.text` and tries to parse the response as **number**.

```javascript
polyasync.num(url, cfg)
	.then(num => console.log(num))
	.catch(e => console.error(e))
```

### .float(url, cfg)

Executes a `polyasync.num` and tries to parse the reponse as **float**.

```javascript
polyasync.float(url, cfg)
	.then(float => console.log(float))
	.catch(e => console.error(e))
```

### .int(url, cfg)

Executes a `polyasync.num` and tries to parse the reponse as **integer**.

```javascript
polyasync.int(url, cfg)
	.then(int => console.log(int))
	.catch(e => console.error(e))
```

### .xml(url, cfg)

Executes a `polyasync.text` and tries to parse the reponse as **XML** document.

```javascript
polyasync.xml(url, cfg)
	.then(xml => console.dir(xml))
	.catch(e => console.error(e))
```

### .html(url, cfg)

Executes a `polyasync.text` and tries to parse the reponse as **HTML** document.

```javascript
polyasync.html(url, cfg)
	.then(html => console.dir(html))
	.catch(e => console.error(e))
```

### .fetchAll(urls, cfg, type)

Replacing **.all(urls, cfg, type)**.

Executes a request for each url in the `urls` Array using the same optional `cfg` object for all. The `type` argument is an optional string to define which **polyasync** action will request all `urls`.

Only `urls` argument is mandatory, `cfg` default is `{ method: 'get' }` and `type` default is `fetch`.

It returns a `Promise.all` and resolves with an array of results or rejects if any request fails.

```javascript
const urls = [...] // a list of urls

polyasync.all(urls, null, 'json')
	.then(results => console.dir(results))
	.catch(e => console.error(e))
```
