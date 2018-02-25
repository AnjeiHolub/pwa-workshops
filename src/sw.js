
const {assets} = global.serviceWorkerOption; //добавляем ассэтсы, то что мы добавили в manifest.json
const CACHE_NAME = 'vivino-cache-v3'; //то как назовем кэш
const URLS_TO_CACHE = self.serviceWorkerOption.assets; 
const URLS_TO_IGNORE = ['chrome-extension', 'sockjs-node'];

// 1 этап инсталл
self.addEventListener('install', (event) => { //слушаем инасталяцию 
  event.waitUntil(precache()); //подготавливаем кэш, то есть записываем из assets в кэш
});

// 2 этап активэйт
self.addEventListener('activate', (event) => {
  event.waitUntil( // ожидаем (то что внутри делаем нужно когда меняем assets или меняем название нашего кэша, очищаем старый кэш
                   // и устанавливаем новый
    caches.keys().then((keys) => { // берем все ключи
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME) // фильтруем по нашему имени и получаем все названия ненужных кашей кроме нашего существующего
          .map(key => caches.delete(key)) // проходимся по всем полченым ненужным ключам и удаляем их из caches
      );
    })
  );
});

self.addEventListener('fetch', (event) => { // перехватываем все запросы
  event.respondWith(caches.open(CACHE_NAME).then((cache) => { // respondWith то есть берем контроль над запросами
    return cache.match(event.request).then(function(response) { //
      if (response) {
        return response;
      }

      if (!navigator.isOnline && isHtmlRequest(event.request)) { //если мы не онлайн и что то еще возвращаем нашу станицу index.html
        return cache.match(new Request('/index.html'));
      }

      if (shouldIgnoreRequest(event.request)) { //если не хотим ничего делать с запросом делаем обычный запрос fetch
        return fetch(event.request); 
      }

      return fetchAndUpdate(event.request); //делаем запрос и обновляем базу caches
    });
  }));
});

function precache() {
  return caches.open(CACHE_NAME).then(function (cache) { //открываем кэш под именем CACHE_NAME и 
    return cache.addAll(assets); // записываем туда assets
  });
}

function shouldIgnoreRequest(request) {
  return URLS_TO_IGNORE
    .map((urlPart) => request.url.includes(urlPart))
    .indexOf(true) > -1;
}

function isHtmlRequest(request) {
  return request.headers.get('accept').includes('text/html');
}

function fetchCors(request) {
  return fetch(new Request(request), { mode: 'cors', credentials: 'same-origin' });
}

function fetchAndUpdate(request) {
  // DevTools opening will trigger these o-i-c requests, which this SW can't handle.
  // There's probaly more going on here, but I'd rather just ignore this problem. :)
  // https://github.com/paulirish/caltrainschedule.io/issues/49
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;

  return caches.open(CACHE_NAME).then((cache) => {
    return fetchCors(request).then((response) => {
      // foreign requests may be res.type === 'opaque' and missing a url
      if (!response.url) return response;

      cache.put(request, response.clone());
      return response;
    });
  });
}
