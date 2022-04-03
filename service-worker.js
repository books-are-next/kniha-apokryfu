/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-e3286a3';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./kniha_apokryfu_001.html","./kniha_apokryfu_002.html","./kniha_apokryfu_003.html","./kniha_apokryfu_004.html","./kniha_apokryfu_005.html","./kniha_apokryfu_006.html","./kniha_apokryfu_007.html","./kniha_apokryfu_008.html","./kniha_apokryfu_009.html","./kniha_apokryfu_010.html","./kniha_apokryfu_011.html","./kniha_apokryfu_012.html","./kniha_apokryfu_013.html","./kniha_apokryfu_014.html","./kniha_apokryfu_015.html","./kniha_apokryfu_016.html","./kniha_apokryfu_017.html","./kniha_apokryfu_018.html","./kniha_apokryfu_019.html","./kniha_apokryfu_020.html","./kniha_apokryfu_021.html","./kniha_apokryfu_022.html","./kniha_apokryfu_023.html","./kniha_apokryfu_024.html","./kniha_apokryfu_025.html","./kniha_apokryfu_026.html","./kniha_apokryfu_027.html","./kniha_apokryfu_028.html","./kniha_apokryfu_029.html","./kniha_apokryfu_030.html","./kniha_apokryfu_031.html","./kniha_apokryfu_032.html","./kniha_apokryfu_033.html","./kniha_apokryfu_034.html","./kniha_apokryfu_035.html","./kniha_apokryfu_036.html","./kniha_apokryfu_037.html","./kniha_apokryfu_038.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image002.jpg","./resources/image003.png","./resources/image001.jpg","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
