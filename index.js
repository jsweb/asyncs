/**
 * @name @jsweb/asyncs
 * @version 4.0.1
 * @desc Simple JS module for Promise and Fetch APIs, with some useful abstraction
 * @author Alex Bruno <git.alexbr@outlook.com>
 * @create date 2016-06-25 03:14:48
 * @modify date 2020-06-13 23:32:09
 */
import { serialize, form } from './jsweb-packs/unpkg/params.js';
import { is, isFunction } from './jsweb-packs/unpkg/truetype.js';

const map = {
  blob: requestBlob,
  boolean: requestBoolean,
  html: requestHTML,
  json: requestJSON,
  number: requestNumber,
  response: request,
  text: requestText,
  xml: requestXML,
};

/**
 * Excute any function asyncronously with any number of arguments.
 *
 * @param {function} fn
 * @param {arguments} args
 * @returns {Promise} Promise
 */
function exec(fn, ...args) {
  return new Promise((resolve, reject) => {
    try {
      const value = fn(...args);
      resolve(value);
    } catch (error) {
      reject(error);
    }
  })
}

/**
 * Execute any function asyncronously As Soon As Possible with any number of arguments.
 * This method tries to use setImmediate (if available) or emulate it.
 *
 * @param {function} fn
 * @param {arguments} args
 * @returns {*}
 */
function asap(fn, ...args) {
  const ok = typeof setImmediate !== 'undefined';
  return ok ? setImmediate(fn, ...args) : setTimeout(fn, 1, ...args)
}

/**
 * Turn any input in a Promise to use it on asyncronous threads
 *
 * @param {*} input
 * @param {arguments} args
 * @returns {Promise} Promise
 */
function task(input, ...args) {
  return is(input, 'Promise')
    ? input
    : isFunction(input)
    ? exec(input, ...args)
    : Promise.resolve(input)
}

/**
 * Turn any number of arguments into asyncronous group to resolve only if all threads resolve.
 *
 * @param {arguments} args
 * @returns {Promise} Promise
 */
function execAll(...args) {
  const queue = args.map(task);
  return Promise.all(queue)
}

/**
 * Turn any number of arguments into asyncronous race to resolve or reject with the fastest thread.
 *
 * @param {arguments} args
 * @returns {Promise} Promise
 */
function execRace(...args) {
  const queue = args.map(task);
  return Promise.race(queue)
}

/**
 * Execute asyncronous HTTP requests with configurable options.
 *
 * This method uses Fetch API with some useful abstractions.
 *
 * To send parameters on request, just add a `body` in `cfg` containing the object for any HTTP method request.
 *
 * GET requests (default), will serialize parameters into a query string.
 *
 * Other methods will convert parameters into FormData object if necessary.
 *
 * So you can also send HTML Form or FormData object for non GET requests.
 *
 * It is also possible to send JSON content. Just set `content-type` to `application/json` at `cfg.headers`.
 *
 * Then your `cfg.body` literal object will be serialized using `JSON.stringify`.
 *
 * The promise returned also checks HTTP response. Any status >= 300 will cause a `Promise.reject`.
 *
 * @param {string} url
 * @param {RequestInit} cfg
 * @returns {Promise} Promise
 */
async function request(url, cfg = {}) {
  cfg.method = cfg.method || 'get';
  cfg.headers = cfg.headers || {};
  cfg.body = cfg.body || {};

  if (cfg.params) {
    const query = serialize(cfg.params);
    url += `?${query}`;
    delete cfg.params;
  }

  const headers = Object.keys(cfg.headers);
  const ctype = headers.find((key) => /content-type/i.test(key));
  const content = ctype ? cfg.headers[ctype] : null;

  if (/json/i.test(content)) {
    cfg.body =
      typeof cfg.body === 'object' ? JSON.stringify(cfg.body) : cfg.body;
  } else if (/urlencoded/i.test(content)) {
    cfg.body = typeof cfg.body === 'object' ? serialize(cfg.body) : cfg.body;
  } else {
    cfg.body = form(cfg.body);

    if (ctype) delete cfg.headers[ctype];
    cfg.headers['content-type'] = 'multipart/form-data';
  }

  try {
    const resp = await fetch(url, cfg);
    return resp.ok ? resp : Promise.reject(resp)
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Use `execAll` to make a `request` for each `urls` using the same `cfg` and `resp` type for all.
 *
 * The result Promise resolves only if all requests resolve.
 *
 * If any request fails, it will cause an entire `Promise.reject`.
 *
 * Possible response types are: response (default), json, text, blob, boolean, number, xml and html.
 *
 * @param {string[]} urls
 * @param {RequestInit} cfg
 * @param {string} resp
 * @returns {Promise} Promise
 */
function requestAll(urls = [], cfg = {}, resp = 'response') {
  const requests = urls.map((url) => map[resp](url, cfg));
  return execAll(requests)
}

/**
 * Use `execRace` to make a `request` race with all `urls` using the same `cfg` and `resp` type for all.
 *
 * The result Promise resolves or rejects with the fastest request.
 *
 * Possible response types are: response (default), json, text, blob, boolean, number, xml and html.
 *
 * @param {string[]} urls
 * @param {RequestInit} cfg
 * @param {string} resp
 * @returns {Promise} Promise
 */
function requestRace(urls = [], cfg = {}, resp = 'response') {
  const requests = urls.map((url) => map[resp](url, cfg));
  return execRace(requests)
}

/**
 * Execute a `request` expecting for a valid JSON response.
 *
 * HTTP errors or invalid JSON response will cause a `Promise.reject`.
 *
 * @param {string} url
 * @param {RequestInit} cfg
 * @returns {Promise} Promise
 */
async function requestJSON(url, cfg = {}) {
  try {
    const resp = await request(url, cfg);
    return await resp.json()
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Execute a `request` expecting for any response and get it as text.
 *
 * HTTP errors will cause a `Promise.reject`.
 *
 * @param {string} url
 * @param {RequestInit} cfg
 * @returns {Promise} Promise
 */
async function requestText(url, cfg = {}) {
  try {
    const resp = await request(url, cfg);
    return await resp.text()
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Execute a `request` expecting for a valid Blob response.
 *
 * HTTP errors or not readable Blob response will cause a `Promise.reject`.
 *
 * @param {string} url
 * @param {RequestInit} cfg
 * @returns {Promise} Promise
 */
async function requestBlob(url, cfg = {}) {
  try {
    const resp = await request(url, cfg);
    return await resp.blob()
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Execute a `request` expecting for any response and get it as boolean.
 *
 * HTTP errors will cause a `Promise.reject`.
 *
 * @param {string} url
 * @param {RequestInit} cfg
 * @returns {Promise} Promise
 */
async function requestBoolean(url, cfg = {}) {
  try {
    const resp = await requestJSON(url, cfg);
    return Boolean(resp)
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Execute a `request` expecting for a valid Number response.
 *
 * The response can be number, string or any value that can be parsed as Number.
 *
 * Invalid values will resolve as `NaN` (not a number).
 *
 * HTTP errors will cause a `Promise.reject`.
 *
 * @param {string} url
 * @param {RequestInit} cfg
 * @returns {Promise} Promise
 */
async function requestNumber(url, cfg = {}) {
  try {
    const resp = await requestText(url, cfg);
    return Number(resp)
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Execute a `request` expecting for a valid XML document response.
 *
 * HTTP errors response will cause a `Promise.reject`.
 *
 * @param {string} url
 * @param {RequestInit} cfg
 * @returns {Promise} Promise
 */
async function requestXML(url, cfg = {}) {
  try {
    const dom = new DOMParser();
    const text = await requestText(url, cfg);
    return dom.parseFromString(text, 'application/xml')
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Execute a `request` expecting for any response and get it as HTML.
 *
 * HTTP errors response will cause a `Promise.reject`.
 *
 * @param {string} url
 * @param {RequestInit} cfg
 * @returns {Promise} Promise
 */
async function requestHTML(url, cfg = {}) {
  try {
    const dom = new DOMParser();
    const text = await requestText(url, cfg);
    return dom.parseFromString(text, 'text/html')
  } catch (error) {
    return Promise.reject(error)
  }
}

export { asap, exec, execAll, execRace, request, requestAll, requestBlob, requestBoolean, requestHTML, requestJSON, requestNumber, requestRace, requestText, requestXML, task };
