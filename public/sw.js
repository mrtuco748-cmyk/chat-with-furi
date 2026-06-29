const CACHE = 'chat-v2';
const ASSETS = [
  '/', '/index.html', '/style.css', '/app.js?v=2',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('/socket.io/')) return;
  if (e.request.url.includes('/api/')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(res => {
        if (res.ok && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

self.addEventListener('push', e => {
  if (!e.data) return;
  try {
    const data = e.data.json();
    self.registration.showNotification(data.title || 'Chat', {
      body: data.body || '',
      icon: '/icons/icon-192.svg',
      tag: 'wa-chat',
      vibrate: [200, 100, 200]
    });
  } catch(e) {}
});
