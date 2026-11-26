// فرمول رشد: کار بدون اینترنت (اول از اینترنت، اگر نشد از حافظه گوشی)
var C='fr-v1';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.add('./')}).catch(function(){}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(new Promise(function(res){var done=false,t=setTimeout(function(){caches.match(r,{ignoreSearch:true}).then(function(m){if(m&&!done){done=true;res(m)}})},4000);
  fetch(r).then(function(n){if(n&&n.ok){var cp=n.clone();caches.open(C).then(function(c){c.put(r.url.split('?')[0].split('#')[0],cp)})}clearTimeout(t);if(!done){done=true;res(n)}})
  .catch(function(){clearTimeout(t);caches.match(r,{ignoreSearch:true}).then(function(m){if(!done){done=true;res(m||Response.error())}})})}))});
