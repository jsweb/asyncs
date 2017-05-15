!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("polyasync",e):t.polyasync=e()}(this,function(){"use strict";var t=function(t){this.src=t};t.prototype.serialize=function(t,e){var r=this,o=this.src;return Object.keys(t||o).map(function(t){var n=e?e+"['"+t+"']":t,i=e?e.replace(/\[\'/g,".").replace(/\'\]/g,""):t,s=e?i+"."+t:t,a=o;return s.split(".").forEach(function(t){return a=a[t]}),a instanceof Object?r.serialize(a,n):[n,a].join("=")}).join("&").replace(/\'/g,"")},t.prototype.parse=function(){var t={};return(this.src.startsWith("?")?this.src.substr(1):this.src).replace(/(;+|&+)/g,"&").split("&").forEach(function(e){var r=e.split("=").map(decodeURIComponent),o=r[0],n=r[1];if(!o)return 0;if(n=n?isNaN(n)?n:new Number(n).valueOf():null,!o.includes("["))return t[o]=t.hasOwnProperty(o)?Array.isArray(t[o])?t[o].push(n):[t[o],n]:n;var i=o.split("["),s=i[0],a=i[1],u=a?a.replace("]",""):0,f=!isNaN(u),h=u?f?parseInt(u):u:0;return t[s]=t.hasOwnProperty(s)?t[s]:f?[]:{},h?t[s][h]=n:t[s].push(n)}),t},t.prototype.form=function(){var t=this;if("undefined"==typeof FormData)return console.error("FormData not supported");if(this.src instanceof FormData)return this.src;if("undefined"!=typeof HTMLFormElement&&this.src instanceof HTMLFormElement)return new FormData(this.src);if(this.src instanceof Object){var e=new FormData;try{for(var r in t.src)t.src.hasOwnProperty(r)&&e.append(r,t.src[r])}catch(t){console.error(t.message)}return e}return this.src};var e=function(e){return new t(e)};!function(t){function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function r(t){return"string"!=typeof t&&(t=String(t)),t}function o(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return m.iterable&&(e[Symbol.iterator]=function(){return e}),e}function n(t){this.map={},t instanceof n?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function i(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function s(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function a(t){var e=new FileReader,r=s(e);return e.readAsArrayBuffer(t),r}function u(t){var e=new FileReader,r=s(e);return e.readAsText(t),r}function f(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}function h(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function c(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(m.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(m.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(m.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(m.arrayBuffer&&m.blob&&v(t))this._bodyArrayBuffer=h(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!m.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!x(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=h(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):m.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},m.blob&&(this.blob=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(f(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},m.formData&&(this.formData=function(){return this.text().then(y)}),this.json=function(){return this.text().then(JSON.parse)},this}function p(t){var e=t.toUpperCase();return A.indexOf(e)>-1?e:t}function d(t,e){e=e||{};var r=e.body;if(t instanceof d){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new n(t.headers)),this.method=t.method,this.mode=t.mode,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new n(e.headers)),this.method=p(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function y(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function l(t){var e=new n;return t.split(/\r?\n/).forEach(function(t){var r=t.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}}),e}function b(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new n(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var m={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(m.arrayBuffer)var w=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],v=function(t){return t&&DataView.prototype.isPrototypeOf(t)},x=ArrayBuffer.isView||function(t){return t&&w.indexOf(Object.prototype.toString.call(t))>-1};n.prototype.append=function(t,o){t=e(t),o=r(o);var n=this.map[t];this.map[t]=n?n+","+o:o},n.prototype.delete=function(t){delete this.map[e(t)]},n.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},n.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},n.prototype.set=function(t,o){this.map[e(t)]=r(o)},n.prototype.forEach=function(t,e){var r=this;for(var o in r.map)r.map.hasOwnProperty(o)&&t.call(e,r.map[o],o,r)},n.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),o(t)},n.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),o(t)},n.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),o(t)},m.iterable&&(n.prototype[Symbol.iterator]=n.prototype.entries);var A=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];d.prototype.clone=function(){return new d(this,{body:this._bodyInit})},c.call(d.prototype),c.call(b.prototype),b.prototype.clone=function(){return new b(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new n(this.headers),url:this.url})},b.error=function(){var t=new b(null,{status:0,statusText:""});return t.type="error",t};var B=[301,302,303,307,308];b.redirect=function(t,e){if(-1===B.indexOf(e))throw new RangeError("Invalid status code");return new b(null,{status:e,headers:{location:t}})},t.Headers=n,t.Request=d,t.Response=b,t.fetch=function(t,e){return new Promise(function(r,o){var n=new d(t,e),i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:l(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;r(new b(e,t))},i.onerror=function(){o(new TypeError("Network request failed"))},i.ontimeout=function(){o(new TypeError("Network request failed"))},i.open(n.method,n.url,!0),"include"===n.credentials&&(i.withCredentials=!0),"responseType"in i&&m.blob&&(i.responseType="blob"),n.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===n._bodyInit?null:n._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:window);var r=function(){};return r.prototype.exec=function(t){return new Promise(t)},r.prototype.asap=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];return"undefined"!=typeof setImmediate?setImmediate.apply(void 0,[t].concat(e)):setTimeout.apply(void 0,[t,1].concat(e))},r.prototype.fetch=function(t,r){if(void 0===r&&(r={}),r.method=r.method?r.method.toLowerCase():"get",r.hasOwnProperty("body"))if("get"===r.method){var o=e(r.body).serialize();t+="?"+o,delete r.body}else{var n=r.headers||{},i=n["Content-type"];switch(i){case"application/json":r.body=r.body instanceof Object?JSON.stringify(r.body):r.body;break;case"application/x-www-form-urlencoded":r.body=e(r.body).serialize();break;default:r.body=e(r.body).form()}}return fetch(t,r).then(function(t){if(t.ok&&t.status>=200&&t.status<300)return t;var e=new Error(t.statusText);return e.response=t,Promise.reject(e)})},r.prototype.all=function(t,e,r){var o=this;void 0===r&&(r="fetch");var n=function(t){return o[r](t,e||{})};return Promise.all(t.map(n))},r.prototype.json=function(t,e){return this.fetch(t,e).then(function(t){return t.json()})},r.prototype.text=function(t,e){return this.fetch(t,e).then(function(t){return t.text()})},r.prototype.bool=function(t,e){return this.text(t,e).then(JSON.parse).then(Boolean)},r.prototype.num=function(t,e){return this.text(t,e).then(Number)},r.prototype.float=function(t,e){return this.num(t,e).then(parseFloat)},r.prototype.int=function(t,e){return this.num(t,e).then(parseInt)},r.prototype.xml=function(t,e){return this.text(t,e).then(function(t){return(new DOMParser).parseFromString(t,"application/xml")})},r.prototype.html=function(t,e){return this.text(t,e).then(function(t){return(new DOMParser).parseFromString(t,"text/html")})},new r});
