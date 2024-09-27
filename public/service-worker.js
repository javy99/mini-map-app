const CACHE_NAME = "map-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/index-CUGwacT1.js",
  "/assets/index-DtS7RPCm.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Failed to cache some resources:", error);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request)
        .then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response as it's going to be consumed by the browser
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            if (event.request.url.includes("/assets/")) {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        })
        .catch(() => {
          // If fetch fails (e.g., offline), return a custom offline page or fallback content
          return caches.match("/index.html");
        });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

console.log("Service Worker Loaded");
