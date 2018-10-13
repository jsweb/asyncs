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
 * @export
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
 * Turn any input in a Promise to use is on asyncronous threads
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
export function request(url: string, cfg: RequestInit = {}): Promise<any> {
  cfg.method = cfg.method ? cfg.method.toLowerCase() : 'get';

  if (cfg.method === 'get') {
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
      cfg.body = serialize((cfg.body as any));
    } else {
      cfg.body = form(cfg.body);
    }
  }

  return fetch(url, cfg).then((resp: Response | any) => {
    if (resp.ok && resp.status >= 200 && resp.status < 300) {
      return resp;
    }
    return Promise.reject(resp);
  });
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
export function requestJSON(url: string, cfg?: RequestInit): Promise<any> {
  return request(url, cfg).then((resp: Response) => resp.json());
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
export function requestText(url: string, cfg?: RequestInit): Promise<string> {
  return request(url, cfg).then((resp: Response) => resp.text());
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
export function requestBlob(url: string, cfg?: RequestInit): Promise<Blob> {
  return request(url, cfg).then((resp: Response) => resp.blob());
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
export function requestBoolean(url: string, cfg?: RequestInit): Promise<boolean> {
  return requestJSON(url, cfg).then(Boolean);
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
export function requestNumber(url: string, cfg?: RequestInit): Promise<number> {
  return requestText(url, cfg).then(Number);
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
export function requestXML(url: string, cfg?: RequestInit): Promise<Document> {
  return requestText(url, cfg).then((text) => {
    const dom = new DOMParser();
    return dom.parseFromString(text, 'application/xml');
  });
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
export function requestHTML(url: string, cfg?: RequestInit): Promise<Document> {
  return requestText(url, cfg).then((text) => {
    const dom = new DOMParser();
    return dom.parseFromString(text, 'text/html');
  });
}
