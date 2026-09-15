const CACHE = 'manmaru-coin-v1';
const ASSETS = [
  './fruit-merge.html',
  './manifest-coin.json',
  './icons/coin-192.png',
  './icons/coin-512.png',
  './assets/coins/yen1.png',
  './assets/coins/yen5.png',
  './assets/coins/yen10.png',
  './assets/coins/yen50.png',
  './assets/coins/yen100.png',
  './assets/coins/yen500.png',
  './assets/coins/yen1000.png',
  './assets/coins/yen5000.png',
  './assets/coins/yen10000.png',
  './assets/audio/bgm.ogg',
  './assets/audio/drop.ogg',
  './assets/audio/merge.ogg',
  './assets/audio/gameover.ogg',
  'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(event.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
