const CACHE_NAME = 'harmonyshop-admin-v1';
const ASSETS = [
  '/admin.html',
  '/css/style.css',
  '/manifest.json',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c =>
      c.addAll(ASSETS)
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp =>
      resp || fetch(e.request)
    )
  );
});
