import { form, serialize } from '@jsweb/params';
import { is, isFunction } from '@jsweb/truetype';

const map: any = {
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
 * @export {function}
 * @param {function} fn
 * @param {arguments} args
 * @returns {Promise}
 */
export function exec(fn: (...args: any[]) => any, ...args: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const value = fn(...args);
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Execute any function asyncronously As Soon As Possible with any number of arguments.
 *
 * @export {function}
 * @param {function} fn
 * @param {arguments} args
 * @returns {*}
 */
export function asap(fn: (...args: any[]) => void, ...args: any[]): any {
  const ok = typeof setImmediate !== 'undefined';
  return ok ? setImmediate(fn, ...args) : setTimeout(fn, 1, ...args);
}

/**
 * Turn any input in a Promise to use it on asyncronous threads
 *
 * @export {function}
 * @param {*} input
 * @returns {Promise}
 */
export function task(input: any): Promise<any> {
  return is(input, 'Promise') ? input :
    isFunction(input) ? exec(input) :
      Promise.resolve(input);
}

/**
 * Turn any number of arguments into asyncronous group to resolve only if all threads resolve.
 *
 * @export {function}
 * @param {arguments} args
 * @returns {Promise}
 */
export function execAll(...args: any[]): Promise<any[]> {
  const queue = args.map(task);
  return Promise.all(queue);
}

/**
 * Turn any number of arguments into asyncronous race to resolve or reject with the fastest thread.
 *
 * @export {function}
 * @param {arguments} args
 * @returns {Promise}
 */
export function execRace(...args: any[]): Promise<any> {
  const queue = args.map(task);
  return Promise.race(queue);
}

/**
 * Execute asyncronous HTTP requests with configurable options.
 *
 * It uses Fetch API with some useful abstractions.
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
 * @export {function}
 * @param {string} url
 * @param {RequestInit} [cfg={}]
 * @returns {Promise}
 */
export async function request(url: string, cfg: RequestInit | any = {}): Promise<any> {
  cfg.method = cfg.method || 'get';

  if (/get/i.test(cfg.method)) {
    const query = cfg.body ? serialize(cfg.body) : '';

    url += query ? `?${query}` : '';
    delete cfg.body;
  } else {
    const headers: HeadersInit | any = cfg.headers || {};
    const content = Object.keys(headers).find((k) => /content-type/i.test(k));
    const ctype = content ? headers[content] : null;

    if (/application\/json/i.test(ctype)) {
      cfg.body = typeof cfg.body === 'object' ? JSON.stringify(cfg.body) : cfg.body;
    } else if (/application\/x-www-form-urlencoded/i.test(ctype)) {
      cfg.body = serialize(cfg.body);
    } else {
      cfg.body = form(cfg.body);
    }
  }

  const resp = await fetch(url, cfg);

  if (resp && resp.ok && resp.status >= 200 && resp.status < 300) {
    return resp;
  }
  return Promise.reject(resp);
}

/**
 * Use `execAll` to make a `request` for each `urls` using the same `cfg` and `resp` type for all.
 *
 * The returned Promise resolves only if all requests resolve.
 *
 * If any request fails it will cause an entire `Promise.reject`.
 *
 * Possible response types are: response, json, text, blob, boolean, number, xml and html.
 *
 * @export {function}
 * @param {string[]} urls
 * @param {RequestInit} [cfg={}]
 * @param {string} [resp='response']
 * @returns {Promise}
 */
export function requestAll(
  urls: string[],
  cfg?: RequestInit,
  resp: string = 'response',
): Promise<any[]> {
  return execAll(
    urls.map((url) => map[resp](url, cfg)),
  );
}

/**
 * Use `execRace` to make a `request` race with all `urls` using the same `cfg` and `resp` type for all.
 *
 * The returned Promise resolves or rejects with the fastest request.
 *
 * Possible response types are: response, json, text, blob, boolean, number, xml and html.
 *
 * @export {function}
 * @param {string[]} urls
 * @param {RequestInit} [cfg={}]
 * @param {string} [resp='response']
 * @returns {Promise}
 */
export function requestRace(
  urls: string[],
  cfg?: RequestInit,
  resp: string = 'response',
): Promise<any> {
  return execRace(
    urls.map((url) => map[resp](url, cfg)),
  );
}

/**
 * Execute a `request` expecting for a valid JSON response.
 *
 * HTTP errors or invalid JSON response will cause a `Promise.reject`.
 *
 * @export {funtion}
 * @param {string} url
 * @param {RequestInit} [cfg={}]
 * @returns {Promise}
 */
export async function requestJSON(url: string, cfg?: RequestInit | any): Promise<any> {
  const resp = await request(url, cfg);
  return await resp.json();
}

/**
 * Execute a `request` expecting for any response and get it as text.
 *
 * HTTP errors will cause a `Promise.reject`.
 *
 * @export {function}
 * @param {string} url
 * @param {RequestInit} [cfg={}]
 * @returns {Promise}
 */
export async function requestText(url: string, cfg?: RequestInit): Promise<string> {
  const resp = await request(url, cfg);
  return await resp.text();
}

/**
 * Execute a `request` expecting for a valid Blob response.
 *
 * HTTP errors or not readable Blob response will cause a `Promise.reject`.
 *
 * @export {function}
 * @param {string} url
 * @param {RequestInit} [cfg={}]
 * @returns {Promise}
 */
export async function requestBlob(url: string, cfg?: RequestInit): Promise<Blob> {
  const resp = await request(url, cfg);
  return await resp.blob();
}

/**
 * Execute a `request` expecting for any response and get it as boolean.
 *
 * HTTP errors will cause a `Promise.reject`.
 *
 * @export {function}
 * @param {string} url
 * @param {RequestInit} [cfg={}]
 * @returns {Promise}
 */
export async function requestBoolean(url: string, cfg?: RequestInit): Promise<boolean> {
  const resp = await requestJSON(url, cfg);
  return Boolean(resp);
}

/**
 * Execute a `request` expecting for a valid Number response.
 *
 * The response can be number, string or any value that can be parsed as Number.
 *
 * Invalid values will resolve as `NaN` object (not a number).
 *
 * HTTP errors will cause a `Promise.reject`.
 *
 * @export {function}
 * @param {string} url
 * @param {RequestInit} [cfg={}]
 * @returns {Promise}
 */
export async function requestNumber(url: string, cfg?: RequestInit): Promise<number> {
  const resp = await requestText(url, cfg);
  return Number(resp);
}

/**
 * Execute a `request` expecting for a valid XML document response.
 *
 * HTTP errors response will cause a `Promise.reject`.
 *
 * @export {function}
 * @param {string} url
 * @param {RequestInit} [cfg={}]
 * @returns {Promise}
 */
export async function requestXML(url: string, cfg?: RequestInit): Promise<Document> {
  const dom = new DOMParser();
  const text = await requestText(url, cfg);
  return dom.parseFromString(text, 'application/xml');
}

/**
 * Execute a `request` expecting for any response and get it as HTML.
 *
 * HTTP errors response will cause a `Promise.reject`.
 *
 * @export {function}
 * @param {string} url
 * @param {RequestInit} [cfg]
 * @returns {Promise}
 */
export async function requestHTML(url: string, cfg?: RequestInit): Promise<Document> {
  const dom = new DOMParser();
  const text = await requestText(url, cfg);
  return dom.parseFromString(text, 'text/html');
}
