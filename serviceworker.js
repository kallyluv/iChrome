version = 1.2;
self.addEventListener("activate",event => {
  event.waitUntil(caches.keys().then(versions => Promise.all(versions.map(cache => {
    if (cache != version) return caches.delete(cache);
  }))));
  event.waitUntil(clients.claim());
  postMessageAllClients({ action: "service-worker-activated" });
});
self.addEventListener("fetch",event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request).then(async response => {
      caches.open(version).then(cache => cache.put(event.request,response));
      return response.clone();
    });
  }));
});
self.addEventListener("message",event => {
  if (event.data.action == "clear-site-caches"){
    caches.keys().then(versions => {
      Promise.all(versions.map(cache => caches.delete(cache)));
      postMessageAllClients({ action: "clear-site-caches-complete" });
    });
  }
});
function postMessageAllClients(data){
  clients.matchAll().then(clients => clients.forEach(client => client.postMessage(data)));
}
