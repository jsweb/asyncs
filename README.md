# @jsweb/asyncs 
 
Simple JS module for Promise and Fetch APIs, with some useful abstraction

**Create**: date 2016-06-25 03:14:48  
**Modify**: date 2019-01-07 01:06:59  
**Version**: 3.0.5  
**Author**: Alex Bruno <git.alexbr@outlook.com>  
**Example**  
```js
import { requestJSON, requestAll, requestRace } from '@jsweb/asyncs'
```
<a name="exec"></a>

## exec(fn, ...args) ⇒ <code>Promise</code>
Excute any function asyncronously with any number of arguments.

**Export**: <code>function</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 
| ...args | <code>arguments</code> | 

<a name="task"></a>

## task(input) ⇒ <code>Promise</code>
Turn any input in a Promise to use is on asyncronous threads

**Export**: <code>function</code>  

| Param | Type |
| --- | --- |
| input | <code>\*</code> | 

<a name="execAll"></a>

## execAll(...args) ⇒ <code>Promise</code>
Turn any number of arguments into asyncronous group to resolve only if all threads resolve.

**Export**: <code>function</code>  

| Param | Type |
| --- | --- |
| ...args | <code>arguments</code> | 

<a name="execRace"></a>

## execRace(...args) ⇒ <code>Promise</code>
Turn any number of arguments into asyncronous race to resolve or reject with the fastest thread.

**Export**: <code>function</code>  

| Param | Type |
| --- | --- |
| ...args | <code>arguments</code> | 

<a name="asap"></a>

## asap(fn, ...args) ⇒ <code>\*</code>
Execute any function asyncronously As Soon As Possible with any number of arguments.

**Export**: <code>function</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 
| ...args | <code>arguments</code> | 

<a name="request"></a>

## request(url, [cfg]) ⇒ <code>Promise</code>
Execute asyncronous HTTP requests with configurable options.

It uses Fetch API with some useful abstractions.

To send parameters on request, just add a `body` in `cfg` containing the object for any HTTP method request.

GET requests (default), will serialize parameters into a query string.

Other methods will convert parameters into FormData object if necessary.

So you can also send HTML Form or FormData object for non GET requests.

It is also possible to send JSON content. Just set `content-type` to `application/json` at `cfg.headers`.

Then your `cfg.body` literal object will be serialized using `JSON.stringify`.

The promise returned also checks HTTP response. Any status >= 300 will cause a `Promise.reject`.

**Export**: <code>function</code>  

| Param | Type | Default |
| --- | --- | --- |
| url | <code>string</code> |  | 
| [cfg] | <code>RequestInit</code> | <code>{}</code> | 

<a name="requestAll"></a>

## requestAll(urls, [cfg], [resp]) ⇒ <code>Promise</code>
Use `execAll` to make a `request` for each `urls` using the same `cfg` and `resp` type for all.

The returned Promise resolves only if all requests resolve.

If any request fails it will cause an entire `Promise.reject`.

Possible response types are: response, json, text, blob, boolean, number, xml and html.

**Export**: <code>function</code>  

| Param | Type | Default |
| --- | --- | --- |
| urls | <code>Array.&lt;string&gt;</code> |  | 
| [cfg] | <code>RequestInit</code> | <code>{}</code> | 
| [resp] | <code>string</code> | <code>&quot;&#x27;response&#x27;&quot;</code> | 

<a name="requestRace"></a>

## requestRace(urls, [cfg], [resp]) ⇒ <code>Promise</code>
Use `execRace` to make a `request` race with all `urls` using the same `cfg` and `resp` type for all.

The returned Promise resolves or rejects with the fastest request.

Possible response types are: response, json, text, blob, boolean, number, xml and html.

**Export**: <code>function</code>  

| Param | Type | Default |
| --- | --- | --- |
| urls | <code>Array.&lt;string&gt;</code> |  | 
| [cfg] | <code>RequestInit</code> | <code>{}</code> | 
| [resp] | <code>string</code> | <code>&quot;&#x27;response&#x27;&quot;</code> | 

<a name="requestJSON"></a>

## requestJSON(url, [cfg]) ⇒ <code>Promise</code>
Execute a `request` expecting for a valid JSON response.

HTTP errors or invalid JSON response will cause a `Promise.reject`.

**Export**: <code>funtion</code>  

| Param | Type | Default |
| --- | --- | --- |
| url | <code>string</code> |  | 
| [cfg] | <code>RequestInit</code> | <code>{}</code> | 

<a name="requestText"></a>

## requestText(url, [cfg]) ⇒ <code>Promise</code>
Execute a `request` expecting for any response and get it as text.

HTTP errors will cause a `Promise.reject`.

**Export**: <code>function</code>  

| Param | Type | Default |
| --- | --- | --- |
| url | <code>string</code> |  | 
| [cfg] | <code>RequestInit</code> | <code>{}</code> | 

<a name="requestBlob"></a>

## requestBlob(url, [cfg]) ⇒ <code>Promise</code>
Execute a `request` expecting for a valid Blob response.

HTTP errors or not readable Blob response will cause a `Promise.reject`.

**Export**: <code>function</code>  

| Param | Type | Default |
| --- | --- | --- |
| url | <code>string</code> |  | 
| [cfg] | <code>RequestInit</code> | <code>{}</code> | 

<a name="requestBoolean"></a>

## requestBoolean(url, [cfg]) ⇒ <code>Promise</code>
Execute a `request` expecting for any response and get it as boolean.

HTTP errors will cause a `Promise.reject`.

**Export**: <code>function</code>  

| Param | Type | Default |
| --- | --- | --- |
| url | <code>string</code> |  | 
| [cfg] | <code>RequestInit</code> | <code>{}</code> | 

<a name="requestNumber"></a>

## requestNumber(url, [cfg]) ⇒ <code>Promise</code>
Execute a `request` expecting for a valid Number response.

The response can be number, string or any value that can be parsed as Number.

Invalid values will resolve as `NaN` object (not a number).

HTTP errors will cause a `Promise.reject`.

**Export**: <code>function</code>  

| Param | Type | Default |
| --- | --- | --- |
| url | <code>string</code> |  | 
| [cfg] | <code>RequestInit</code> | <code>{}</code> | 

<a name="requestXML"></a>

## requestXML(url, [cfg]) ⇒ <code>Promise</code>
Execute a `request` expecting for a valid XML document response.

HTTP errors response will cause a `Promise.reject`.

**Export**: <code>function</code>  

| Param | Type | Default |
| --- | --- | --- |
| url | <code>string</code> |  | 
| [cfg] | <code>RequestInit</code> | <code>{}</code> | 

<a name="requestHTML"></a>

## requestHTML(url, [cfg]) ⇒ <code>Promise</code>
Execute a `request` expecting for any response and get it as HTML.

HTTP errors response will cause a `Promise.reject`.

**Export**: <code>function</code>  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [cfg] | <code>RequestInit</code> | 

