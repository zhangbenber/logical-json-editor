"use strict";var precacheConfig=[["/logical-json-editor/index.html","473844342cb2e0e02b4766b63de67a3a"],["/logical-json-editor/static/css/main.79b32941.css","621c6d67860ec9a92f2c9a05d8551655"],["/logical-json-editor/static/js/main.76c1807c.js","6ff3c91b2cc37645620b8c212e1f3bee"],["/logical-json-editor/static/media/fa-brands-400.42f9fd6a.svg","42f9fd6acee87559ac0d6a33488db65e"],["/logical-json-editor/static/media/fa-brands-400.659c4d58.woff2","659c4d58b00226541ef95c3a76e169c5"],["/logical-json-editor/static/media/fa-brands-400.8b7a9afd.woff","8b7a9afd7b95f62e6ee8a72930bfb9ed"],["/logical-json-editor/static/media/fa-brands-400.b69de69a.ttf","b69de69a4ff8ca0abe96ec0b0c180c5b"],["/logical-json-editor/static/media/fa-brands-400.ec0716ae.eot","ec0716ae8aa1ba781a1a6bcbce833f6c"],["/logical-json-editor/static/media/fa-regular-400.0b5e3a54.woff","0b5e3a5451fc62d9023ccafc85bc89db"],["/logical-json-editor/static/media/fa-regular-400.0c419713.svg","0c41971339b9fc5b1cefb0abad1e2e69"],["/logical-json-editor/static/media/fa-regular-400.6493321d.eot","6493321d567eb0f22bd5112fbcf044a8"],["/logical-json-editor/static/media/fa-regular-400.b48c48ea.ttf","b48c48ea8457846a5695b139c377d3d1"],["/logical-json-editor/static/media/fa-regular-400.bdadb6ce.woff2","bdadb6ce95c5a2e7b673940721450d3c"],["/logical-json-editor/static/media/fa-solid-900.4478b4d7.svg","4478b4d7022cad174e4c04246fe622ef"],["/logical-json-editor/static/media/fa-solid-900.48f54f63.ttf","48f54f63d7711d0912a9a10205538fc4"],["/logical-json-editor/static/media/fa-solid-900.bcb927a7.woff","bcb927a742a8370b76642fd1a9a749c0"],["/logical-json-editor/static/media/fa-solid-900.f29ad003.eot","f29ad0031ad2c1c14b771ce504e2bfa7"],["/logical-json-editor/static/media/fa-solid-900.fb493903.woff2","fb493903265cad425ccdf8e04fc2de61"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),r=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),e=urlsToCacheKeys.has(t));var r="/logical-json-editor/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});