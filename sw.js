const C = 'cebacontrol-v4', F = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(F))) });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x != C).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
    const u = new URL(e.request.url);
    if (e.request.method !== 'GET' || (u.origin !== location.origin && u.hostname !== 'www.gstatic.com')) return;
    e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r }).catch(() => caches.match(e.request)))
});