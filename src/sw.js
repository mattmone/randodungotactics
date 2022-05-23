const PRECACHE = "precache";
const CACHE = "cache";
const precacheManifest = [
  {
    url: "./libs/comlink.min.js",
    revision: "1"
  },{
    url: "./libs/three.module.js",
    revision: "1"
  },{
    url: "./libs/GLTFLoader.js",
    revision: "1"
  },{
    url: "./libs/idb-keyval.js",
    revision: "1"
  },{
    url: "./font/vt323.woff2",
    revision: "1"
  }
];
const entryToUrl = ({ url, revision }) =>
  new URL(`${location.origin}/${url}?v=${revision}`).toString();
const precacheManifold = Object.fromEntries(
  precacheManifest.map((entry) => [
    new URL(`${location.origin}/${entry.url}`).toString(),
    entryToUrl(entry),
  ])
);

self.addEventListener("install", (event) => {
  console.log("installing");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      return Promise.all(
        precacheManifest.map((entry) => cache.add(entryToUrl(entry)))
      ).then(() => {
        console.log("done install");
        self.skipWaiting();
      });
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      self.clients.claim();
      const cache = await caches.open(PRECACHE);
      const urls = (await cache.keys()).map((request) =>
        new URL(request.url).toString()
      );
      const precacheUrls = Object.values(precacheManifold);
      urls.forEach((url) => {
        if (!precacheUrls.includes(url)) cache.delete(url);
      });
    })()
  );
});

self.addEventListener("fetch", (event) => {
    let requestUrl = event.request.url;
    console.log("fetch request", requestUrl);
    if (requestUrl === `${location.origin}/`)
    requestUrl = new URL(`${location.origin}/index.html`).toString();
    if (Object.keys(precacheManifold).includes(requestUrl)) {
    console.log("precache response");
    return event.respondWith(
        (async () => {
        const cache = await caches.open(PRECACHE);
        const url = precacheManifold[requestUrl];
        if (!url) return fetch(requestUrl);
        const match = await cache.match(url);
        return match;
        })()
    );
    }
    console.log("cache check", requestUrl);
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const match = await cache.match(requestUrl);
        if (match) {
          console.log("match found, cache response", match);
          return match;
        }

        const response = await fetch(requestUrl);
        // cache.put(requestUrl, response.clone());
        console.log("match not found, skipping caching -> network response", requestUrl);
        return response;
      })()
    );
});
