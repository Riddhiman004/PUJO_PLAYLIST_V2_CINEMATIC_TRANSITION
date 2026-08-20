const CACHE_NAME = "pujo-playlist-v4";

const APP_FILES = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/songs.js",
  "/manifest.json",
  "/icons/icon-192(1).png",
  "/icons/icon-512(1).png"
];


/* ==============================
   INSTALL
   ============================== */

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_FILES);
    })
  );

  self.skipWaiting();
});


/* ==============================
   ACTIVATE
   DELETE OLD CACHE
   ============================== */

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});


/* ==============================
   FETCH
   NETWORK FIRST
   CACHE FALLBACK
   ============================== */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Only handle files from this website
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)

      .then(networkResponse => {

        const responseClone = networkResponse.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      })

      .catch(() => {

        return caches.match(event.request).then(cachedResponse => {

          if (cachedResponse) {
            return cachedResponse;
          }

          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }

          return Response.error();
        });

      })
  );

});