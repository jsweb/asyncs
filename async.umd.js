!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("async",e):t.async=e()}(this,function(){"use strict";function t(t,e){return e={exports:{}},t(e,e.exports),e.exports}var e=function(t){try{this.item=t}catch(t){this.item=void 0}};e.prototype.toString=function(){return Object.prototype.toString.call(this.item).substr(8).replace("]","")},e.prototype.instance=function(){return this.item.constructor.name},e.prototype.isObject=function(){return"Object"===this.toString()},e.prototype.isArray=function(){return"Array"===this.toString()},e.prototype.isString=function(){return"String"===this.toString()},e.prototype.isBoolean=function(){return"Boolean"===this.toString()},e.prototype.isDate=function(){return"Date"===this.toString()},e.prototype.isRegExp=function(){return"RegExp"===this.toString()},e.prototype.isNull=function(){return"Null"===this.toString()},e.prototype.isDefined=function(){return"Undefined"!==this.toString()},e.prototype.isNumber=function(){return"Number"===this.toString()},e.prototype.isInt=function(){return!!this.isNumber()&&this.item===parseInt(this.item)},e.prototype.isFloat=function(){return!!this.isNumber()&&this.item!==parseInt(this.item)},e.prototype.is=function(t){switch(t){case"Int":return this.isInt();case"Float":return this.isFloat();default:return this.toString()===t||this.instance()===t}};var n=function(t){return new e(t)},r={};r.serialize=function(t,e){var n=Object.keys(t),o=n.map(function(n){var o=t[n],i=e?e+"["+n+"]":n;return o instanceof Object?r.serialize(o,i):[i,o].map(encodeURIComponent).join("=")});return o.join("&")},r.parse=function(t){var e={},n=t.startsWith("?")?t.substr(1):t,r=n.replace(/(;+|&+)/g,"&").split("&");return r.forEach(function(t){var n=t.split("=").map(decodeURIComponent),r=n[0],o=n[1];if(!r)return 0;if(o=o?isNaN(o)?o:new Number(o).valueOf():null,!r.includes("["))return e[r]=e.hasOwnProperty(r)?Array.isArray(e[r])?e[r].push(o):[e[r],o]:o;var i=r.split("["),s=i[0],a=i[1],u=a?a.replace("]",""):0,f=!isNaN(u),c=u?f?parseInt(u):u:0;return e[s]=e.hasOwnProperty(s)?e[s]:f?[]:{},c?e[s][c]=o:e[s].push(o)}),e},r.form=function(t){if("undefined"==typeof FormData)return console.error("FormData not supported");if(t instanceof FormData)return t;if("undefined"!=typeof HTMLFormElement&&t instanceof HTMLFormElement)return new FormData(t);if(t instanceof Object){var e=new FormData;try{for(var n in t)t.hasOwnProperty(n)&&e.append(n,t[n])}catch(t){console.error(t.message)}return e}};var o="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};t(function(t){!function(e){function n(){}function r(t,e){return function(){t.apply(e,arguments)}}function o(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],c(t,this)}function i(t,e){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(e):(t._handled=!0,void o._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:a)(e.promise,t._value);var r;try{r=n(t._value)}catch(t){return void a(e.promise,t)}s(e.promise,r)}))}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof o)return t._state=3,t._value=e,void u(t);if("function"==typeof n)return void c(r(n,e),t)}t._state=1,t._value=e,u(t)}catch(e){a(t,e)}}function a(t,e){t._state=2,t._value=e,u(t)}function u(t){2===t._state&&0===t._deferreds.length&&o._immediateFn(function(){t._handled||o._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)i(t,t._deferreds[e]);t._deferreds=null}function f(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function c(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,a(e,t))})}catch(t){if(n)return;n=!0,a(e,t)}}var h=setTimeout;o.prototype.catch=function(t){return this.then(null,t)},o.prototype.then=function(t,e){var r=new this.constructor(n);return i(this,new f(t,e,r)),r},o.all=function(t){var e=Array.prototype.slice.call(t);return new o(function(t,n){function r(i,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(t){r(i,t)},n)}e[i]=s,0===--o&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var o=e.length,i=0;i<e.length;i++)r(i,e[i])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(t){return new o(function(e,n){n(t)})},o.race=function(t){return new o(function(e,n){for(var r=0,o=t.length;r<o;r++)t[r].then(e,n)})},o._immediateFn="function"==typeof setImmediate&&function(t){setImmediate(t)}||function(t){h(t,0)},o._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},o._setImmediateFn=function(t){o._immediateFn=t},o._setUnhandledRejectionFn=function(t){o._unhandledRejectionFn=t},"undefined"!=typeof t&&t.exports?t.exports=o:e.Promise||(e.Promise=o)}(o)});!function(t){function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function n(t){return"string"!=typeof t&&(t=String(t)),t}function r(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return b.iterable&&(e[Symbol.iterator]=function(){return e}),e}function o(t){this.map={},t instanceof o?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function i(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function s(t){return new Promise(function(e,n){t.onload=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function a(t){var e=new FileReader,n=s(e);return e.readAsArrayBuffer(t),n}function u(t){var e=new FileReader,n=s(e);return e.readAsText(t),n}function f(t){for(var e=new Uint8Array(t),n=new Array(e.length),r=0;r<e.length;r++)n[r]=String.fromCharCode(e[r]);return n.join("")}function c(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function h(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(b.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(b.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(b.arrayBuffer&&b.blob&&w(t))this._bodyArrayBuffer=c(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!b.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!g(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=c(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},b.blob&&(this.blob=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(f(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},b.formData&&(this.formData=function(){return this.text().then(l)}),this.json=function(){return this.text().then(JSON.parse)},this}function d(t){var e=t.toUpperCase();return _.indexOf(e)>-1?e:t}function p(t,e){e=e||{};var n=e.body;if("string"==typeof t)this.url=t;else{if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new o(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new o(e.headers)),this.method=d(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function l(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var n=t.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(r),decodeURIComponent(o))}}),e}function y(t){var e=new o;return t.split("\r\n").forEach(function(t){var n=t.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();e.append(r,o)}}),e}function m(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new o(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var b={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(b.arrayBuffer)var v=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],w=function(t){return t&&DataView.prototype.isPrototypeOf(t)},g=ArrayBuffer.isView||function(t){return t&&v.indexOf(Object.prototype.toString.call(t))>-1};o.prototype.append=function(t,r){t=e(t),r=n(r);var o=this.map[t];this.map[t]=o?o+","+r:r},o.prototype.delete=function(t){delete this.map[e(t)]},o.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},o.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},o.prototype.set=function(t,r){this.map[e(t)]=n(r)},o.prototype.forEach=function(t,e){var n=this;for(var r in this.map)n.map.hasOwnProperty(r)&&t.call(e,n.map[r],r,n)},o.prototype.keys=function(){var t=[];return this.forEach(function(e,n){t.push(n)}),r(t)},o.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),r(t)},o.prototype.entries=function(){var t=[];return this.forEach(function(e,n){t.push([n,e])}),r(t)},b.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var _=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];p.prototype.clone=function(){return new p(this,{body:this._bodyInit})},h.call(p.prototype),h.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},m.error=function(){var t=new m(null,{status:0,statusText:""});return t.type="error",t};var x=[301,302,303,307,308];m.redirect=function(t,e){if(x.indexOf(e)===-1)throw new RangeError("Invalid status code");return new m(null,{status:e,headers:{location:t}})},t.Headers=o,t.Request=p,t.Response=m,t.fetch=function(t,e){return new Promise(function(n,r){var o=new p(t,e),i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:y(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;n(new m(e,t))},i.onerror=function(){r(new TypeError("Network request failed"))},i.ontimeout=function(){r(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&b.blob&&(i.responseType="blob"),o.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"==typeof o._bodyInit?null:o._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:window),function(t,e){function n(t){var e=arguments;"function"!=typeof t&&(t=new Function(""+t));for(var n=new Array(arguments.length-1),r=0;r<n.length;r++)n[r]=e[r+1];var o={callback:t,args:n};return l[p]=o,d(p),p++}function r(t){delete l[t]}function o(t){var n=t.callback,r=t.args;switch(r.length){case 0:n();break;case 1:n(r[0]);break;case 2:n(r[0],r[1]);break;case 3:n(r[0],r[1],r[2]);break;default:n.apply(e,r)}}function i(t){if(y)setTimeout(i,0,t);else{var e=l[t];if(e){y=!0;try{o(e)}finally{r(t),y=!1}}}}function s(){d=function(t){process.nextTick(function(){i(t)})}}function a(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}function u(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&i(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),d=function(n){t.postMessage(e+n,"*")}}function f(){var t=new MessageChannel;t.port1.onmessage=function(t){var e=t.data;i(e)},d=function(e){t.port2.postMessage(e)}}function c(){var t=m.documentElement;d=function(e){var n=m.createElement("script");n.onreadystatechange=function(){i(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}function h(){d=function(t){setTimeout(i,0,t)}}if(!t.setImmediate){var d,p=1,l={},y=!1,m=t.document,b=Object.getPrototypeOf&&Object.getPrototypeOf(t);b=b&&b.setTimeout?b:t,"[object process]"==={}.toString.call(t.process)?s():a()?u():t.MessageChannel?f():m&&"onreadystatechange"in m.createElement("script")?c():h(),b.setImmediate=n,b.clearImmediate=r}}("undefined"==typeof self?"undefined"==typeof o?o:o:self);var i={immediate:setImmediate,promise:function(t){return new Promise(t)},fetch:function(t,e){if(void 0===e&&(e={}),e.method=e.method||"get",e.hasOwnProperty("body")&&n(e.body).isObject())if("get"===e.method){var o=r.serialize(e.body);t+="?"+o,delete e.body}else{var i=r.form(e.body);e.body=i}return fetch(t,e).then(function(t){if(t.ok&&t.status>=200&&t.status<300)return t;var e=new Error(t.statusText);throw e.response=t,e})},json:function(t,e){return i.fetch(t,e).then(function(t){return t.json()})},text:function(t,e){return i.fetch(t,e).then(function(t){return t.text()})},bool:function(t,e){return i.text(t,e).then(JSON.parse).then(Boolean)},num:function(t,e){return i.text(t,e).then(Number)},float:function(t,e){return i.num(t,e).then(parseFloat)},int:function(t,e){return i.num(t,e).then(parseInt)},xml:function(t,e){return i.text(t,e).then(function(t){var e=new DOMParser;return e.parseFromString(t,"application/xml")})},html:function(t,e){return i.text(t,e).then(function(t){var e=new DOMParser;return e.parseFromString(t,"text/html")})}};return i});
