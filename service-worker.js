const CACHE_NAME = 'billaviluxe-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/bvllogo/Asset1.png'
];

// تثبيت ملف الخدمة وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل الخدمة والاستجابة في حالة عدم وجود إنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
