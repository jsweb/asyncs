!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("polyasync",e):t.polyasync=e()}(this,function(){"use strict";"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var t,e=(function(t,e){var r;t.exports=((r=function(t){this.src=t}).prototype.serialize=function(t,e){var r=this,n=this.src;return Object.keys(t||n).map(function(t){var o=e?e+"['"+t+"']":t,i=e?e.replace(/\[\'/g,".").replace(/\'\]/g,""):t,s=n;return(e?i+"."+t:t).split(".").forEach(function(t){return s=s[t]}),s instanceof Object?r.serialize(s,o):[o,s].join("=")}).join("&").replace(/\'/g,"")},r.prototype.parse=function(){var t={};return(this.src.startsWith("?")?this.src.substr(1):this.src).replace(/(;+|&+)/g,"&").split("&").forEach(function(e){var r=e.split("=").map(decodeURIComponent),n=r[0],o=r[1];if(!n)return 0;if(o=o?isNaN(o)?o:new Number(o).valueOf():null,!n.includes("["))return t[n]=t.hasOwnProperty(n)?Array.isArray(t[n])?t[n].push(o):[t[n],o]:o;var i=n.split("["),s=i[0],c=i[1],u=c?c.replace("]",""):0,a=!isNaN(u),p=u?a?parseInt(u):u:0;return t[s]=t.hasOwnProperty(s)?t[s]:a?[]:{},p?t[s][p]=o:t[s].push(o)}),t},r.prototype.form=function(){var t=this;if("undefined"==typeof FormData)return console.error("FormData not supported");if(this.src instanceof FormData)return this.src;if("undefined"!=typeof HTMLFormElement&&this.src instanceof HTMLFormElement)return new FormData(this.src);if("string"==typeof this.src)return this.form(this.parse());if(this.src instanceof Object){var e=new FormData;try{for(var r in t.src)t.src.hasOwnProperty(r)&&e.append(r,t.src[r])}catch(t){console.error(t.message)}return e}return this.src},function(t){return new r(t)})}(t={exports:{}},t.exports),t.exports),r=function(){};return r.prototype.asap=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];return"undefined"!=typeof setImmediate?setImmediate.apply(void 0,[t].concat(e)):setTimeout.apply(void 0,[t,1].concat(e))},r.prototype.exec=function(t){return new Promise(t)},r.prototype.tasks=function(t){var e=this;return t.map(function(t){return t instanceof Promise?t:t instanceof Function?e.exec(t):Promise.resolve(t)})},r.prototype.execAll=function(t){return Promise.all(this.tasks(t))},r.prototype.execRace=function(t){return Promise.race(this.tasks(array))},r.prototype.fetch=function(t,r){if(void 0===r&&(r={}),r.method=r.method?r.method.toLowerCase():"get",r.body)if("get"===r.method){t+="?"+e(r.body).serialize(),delete r.body}else{var n=r.headers||{},o=n[Object.values(n).find(function(t){return/content-type/i.test(t)})];r.body="application/json"===o?r.body instanceof Object?JSON.stringify(r.body):r.body:"application/x-www-form-urlencoded"===o?e(r.body).serialize():e(r.body).form()}return fetch(t,r).then(function(t){if(t.ok&&t.status>=200&&t.status<300)return t;var e=new Error(t.statusText);return e.response=t,Promise.reject(e)})},r.prototype.fetchAll=function(t,e,r){var n=this;void 0===r&&(r="fetch");return this.execAll(t.map(function(t){return n[r](t,e)}))},r.prototype.fetchRace=function(t,e,r){var n=this;void 0===r&&(r="fetch");return this.execRace(t.map(function(t){return n[r](t,e)}))},r.prototype.json=function(t,e){return this.fetch(t,e).then(function(t){return t.json()})},r.prototype.text=function(t,e){return this.fetch(t,e).then(function(t){return t.text()})},r.prototype.blob=function(t,e){return this.fetch(t,e).then(function(t){return t.blob()})},r.prototype.bool=function(t,e){return this.text(t,e).then(JSON.parse).then(Boolean)},r.prototype.num=function(t,e){return this.text(t,e).then(Number)},r.prototype.float=function(t,e){return this.num(t,e).then(parseFloat)},r.prototype.int=function(t,e){return this.num(t,e).then(parseInt)},r.prototype.xml=function(t,e){return this.text(t,e).then(function(t){return(new DOMParser).parseFromString(t,"application/xml")})},r.prototype.html=function(t,e){return this.text(t,e).then(function(t){return(new DOMParser).parseFromString(t,"text/html")})},new r});
