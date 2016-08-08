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
<script src="path/to/polyasync.min.js"></script>
```

## Methods

### polyasync.promise(fn)

Returns a `new Promise(fn)` if available or use a polyfill to emulate a Promise.

**polyasync** uses [ES6-Promises](https://github.com/jakearchibald/ES6-Promises) to polyfill the Promise object when needed.

```javascript
polyasync.promise((done, fail) => {
	// async code goes here
}).then(done).catch(fail)
```

### polyasync.fetch(url, cfg)

Returns a Fetch API object if available or use a polyfill to emulate Fetch API. Fetch API returns a Promise that resolves on HTTP response or reject on HTTP error.

**polyasync** uses [github/fetch](https://github.com/github/fetch) to polyfill the Fetch API when needed.

```javascript
polyasync.fetch(url, cfg).then(done).catch(fail)
```

The `url` param is a simple URL string and the `cfg` param needs to be an object like used for Fetch API itself.
