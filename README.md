# @jsweb/asyncs

Simple JS module for web applications to do async things using Promise, Fetch API and setImmediate.

Compatible with modern browsers. If you want to support older browsers, you will need polyfills for Promise and Fetch API. I recomend:

- [promise-polyfill](https://www.npmjs.com/package/promise-polyfill)
- [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch)

***

## Installation

`npm i -S @jsweb/asyncs`

or

`yarn add @jsweb/asyncs`

or

```html
<script src='https://unpkg.com/@jsweb/asyncs'></script>
```

## Usage

### ES6

```javascript
import asyncs from '@jsweb/asyncs'
```

### CommonJS

```javascript
const asyncs = require('@jsweb/asyncs')
```

### Global

When using via CDN, `asyncs` object will be global available at window scope.

## Methods

### asyncs.asap(fn, ...args)

This method tries to return a `setImmediate` object if available at global enviroment, else it simply emulates using `setTimeout`.

```javascript
asyncs.asap(myFunction, arg1, arg2, ...args)
```

### asyncs.exec(fn)

Returns a `new Promise(fn)` object just for convenience.

```javascript
asyncs.exec((done, fail) => {
	// async code here
}).then(done).catch(fail)
```

### asyncs.execAll(array)

Returns a `Promise.all` object with a little abstraction, just for convenience. `Promise.all` returns a Promise which resolves with an Array of results after all Promises resolve, or rejects if any Promise rejects.

The `array` argument will be processed by `asyncs.tasks(array)` method before Promise execution to turn all non Promise items into Promises.

```javascript
const tasks = [
  new Promise(fn),
  fetch('my/url'),
  Promise.resolve(any),
  function(done, fail) { /* async code here */ },
  function(done, fail) { /* more async code here */ }
]

asyncs.execAll(tasks).then(done).catch(fail)
```

### asyncs.execRace(array)

Returns a `Promise.race` object with a little abstraction, just for convenience. `Promise.race` returns a Promise which resolves or rejects with the fastest Promise in the `array`.

The `array` argument will be processed by `asyncs.tasks(array)` method before Promise execution to turn all non Promise items into Promises.

```javascript
const tasks = [
  new Promise(fn),
  fetch('my/url'),
  Promise.resolve(any),
  function(done, fail) { /* async code here */ },
  function(done, fail) { /* more async code here */ }
]

asyncs.execRace(tasks).then(done).catch(fail)
```

### asyncs.tasks(array)

Returns a new Array converting all non Promise items into Promises.

The `array` argument can contain Promises or executor Functions for Promises. Anything else will be parsed with `Promise.resolve`.

```javascript
const tasks = [
  new Promise(fn),
  fetch('my/url'),
  Promise.resolve(any),
  function(done, fail) { /* async code here */ },
  function(done, fail) { /* more async code here */ },
  'some string',
  34e5,
  null
]

const promises = asyncs.tasks(tasks) // Now all items are Promises
```

### asyncs.fetch(url, cfg)

Returns a Fetch API object which resolves on HTTP response or rejects on HTTP error.

```javascript
asyncs.fetch(url, cfg).then(done).catch(fail)
```

Arguments expected are the same for Fetch API itself. But, some little and useful abstractions are applied to simplify **@jsweb/asyncs** usage.

If you want to send parameters on your request, just add a `body` in `cfg` containing a literal object with all your `key:value` pairs for any HTTP method request.

If your request is a `GET` (default), then `cfg.body` will be serialized into a query string, else it will be converted into a FormData object if necessary. So you can also send HTML Form or FormData object for non `GET` requests.

**@jsweb/asyncs** uses [@jsweb/params](https://www.npmjs.com/package/@jsweb/params) to convert `cfg.body` into query string or FormData to send it with Fetch API request.

It is also possible to send JSON content. Just set `content-type` to `application/json` at `cfg.headers`. Then your `cfg.body` literal object will be serialized using `JSON.stringify`.

**@jsweb/asyncs** tests HTTP response for any error status >= 300. The error will cause a Promise rejection which can be catched.

```javascript
asyncs.fetch('my/url', {
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

### asyncs.fetchAll(urls, cfg, type)

Executes a request for each url in the `urls` Array using the same optional `cfg` object for all. The `type` argument is an optional string to define which **@jsweb/asyncs** action will request all `urls`.

Only `urls` Array argument is mandatory, `cfg` default is `{ method: 'get' }` and `type` default is `fetch`.

For `type` you can use fetch (default), json, text, bool, num, float, int, xml or html.

It returns `asyncs.execAll(tasks)` and resolves with an array of results or rejects if any request fails.

```javascript
const urls = [...] // a list of urls

asyncs.fetchAll(urls, null, 'json')
	.then(results => console.dir(results))
	.catch(err => console.error(err))
```

### asyncs.fetchRace(urls, cfg, type)

Executes a race of requests for each url in the `urls` Array using the same optional `cfg` object for all. The `type` argument is an optional string to define which **@jsweb/asyncs** action will request all `urls`.

Only `urls` Array argument is mandatory, `cfg` default is `{ method: 'get' }` and `type` default is `fetch`.

For `type` you can use fetch (default), json, text, bool, num, float, int, xml or html.

It returns `asyncs.execRace(tasks)` and resolves or rejects with the fastest result or error.

```javascript
const urls = [...] // a list of urls

asyncs.fetchRace(urls, null, 'text')
	.then(results => console.dir(results))
	.catch(err => console.error(err))
```

### asyncs.json(url, cfg)

Executes `asyncs.fetch` and tries to parse the response as **JSON**.

```javascript
asyncs.json(url, cfg)
	.then(json => console.dir(json))
	.catch(err => console.error(err))
```

### asyncs.text(url, cfg)

Executes `asyncs.fetch` and returns resolved response as **text**.

```javascript
asyncs.text(url, cfg)
	.then(text => console.log(text))
	.catch(err => console.error(err))
```

### asyncs.bool(url, cfg)

Executes `asyncs.text` and tries to parse the response as **boolean**.

```javascript
asyncs.bool(url, cfg)
	.then(bool => console.log(bool))
	.catch(err => console.error(err))
```

### asyncs.num(url, cfg)

Executes `asyncs.text` and tries to parse the response as **number**.

```javascript
asyncs.num(url, cfg)
	.then(num => console.log(num))
	.catch(err => console.error(err))
```

### .float(url, cfg)

Executes `asyncs.num` and tries to parse the reponse as **float**.

```javascript
asyncs.float(url, cfg)
	.then(float => console.log(float))
	.catch(err => console.error(err))
```

### .int(url, cfg)

Executes `asyncs.num` and tries to parse the reponse as **integer**.

```javascript
asyncs.int(url, cfg)
	.then(int => console.log(int))
	.catch(err => console.error(err))
```

### .xml(url, cfg)

Executes `asyncs.text` and tries to parse the reponse as **XML** document.

```javascript
asyncs.xml(url, cfg)
	.then(xml => console.dir(xml))
	.catch(err => console.error(err))
```

### .html(url, cfg)

Executes `asyncs.text` and tries to parse the reponse as **HTML** document.

```javascript
asyncs.html(url, cfg)
	.then(html => console.dir(html))
	.catch(err => console.error(err))
```
