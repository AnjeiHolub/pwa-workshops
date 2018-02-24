
const {assets} = global.serviceWorkerOption;
console.log(assets);
const CACHE_NAME = 'vivino-cache-v3';

self.addEventListener('install', (event) => {
  event.waitUntil(precache());
});

self.addEventListener('activate', (event) => {
  console.log('activate');
});

self.addEventListener('fetch', (event) => {
  console.log('activate');
});

function precache() {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(assets);
  });
}