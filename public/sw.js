const APP_VERSION = "0.22.10";
const CACHE_PREFIX = "tetorica-retro-player-";
const CACHE_NAME = `${CACHE_PREFIX}${APP_VERSION}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./Square142x142Logo.png",
  "./Square310x310Logo.png",
];

const streamFiles = new Map();

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }
  if (event.data?.type === "SW_REGISTER_FILE") {
    const { id, file } = event.data;
    streamFiles.set(id, file);
    return;
  }
  if (event.data?.type === "SW_UNREGISTER_FILE") {
    streamFiles.delete(event.data.id);
    return;
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

//
// 更新ボタンで明示的に切り替えたい場合
//self.addEventListener("install", (event) => {
//  event.waitUntil(
//    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
//  );
//});
//


self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys.map((key) => {
        if (!key.startsWith(CACHE_PREFIX)) return Promise.resolve();
        if (key === CACHE_NAME) return Promise.resolve();
        return caches.delete(key);
      })
    );

    await clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.origin === location.origin && url.pathname.startsWith("/sw-stream/")) {
    const id = url.pathname.slice("/sw-stream/".length);
    const file = streamFiles.get(id);

    if (!file) {
      event.respondWith(new Response("File stream not found", { status: 404 }));
      return;
    }

    const rangeHeader = event.request.headers.get("range");
    if (rangeHeader) {
      const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
      const startByte = match?.[1] ? parseInt(match[1], 10) : 0;
      const endByte = match?.[2] ? parseInt(match[2], 10) : file.size - 1;
      const clampedEnd = Math.min(endByte, file.size - 1);
      const slice = file.slice(startByte, clampedEnd + 1);

      event.respondWith(
        slice.arrayBuffer().then((buffer) =>
          new Response(buffer, {
            status: 206,
            headers: {
              "Content-Type": file.type || "application/octet-stream",
              "Content-Range": `bytes ${startByte}-${clampedEnd}/${file.size}`,
              "Content-Length": String(clampedEnd - startByte + 1),
              "Accept-Ranges": "bytes",
            },
          })
        )
      );
      return;
    }

    event.respondWith(
      new Response(file.stream(), {
        status: 200,
        headers: {
          "Content-Type": file.type || "application/octet-stream",
          "Content-Length": String(file.size),
          "Accept-Ranges": "bytes",
        },
      })
    );
    return;
  }

  if (event.request.headers.has("range")) return;
  if (url.origin !== location.origin) return;

  //const isDemoAsset = url.pathname.includes("/demo/");
  //if (!isDemoAsset) return;

  const isHtmlRequest =
    event.request.mode === "navigate" ||
    event.request.destination === "document";

  if (isHtmlRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response?.ok && response.status === 200) {
            const cloned = response.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then((cache) => {
                return cache.put(event.request, cloned);
              })
            );
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (response?.ok && response.status === 200) {
          const cloned = response.clone();
          event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
              return cache.put(event.request, cloned);
            })
          );
        }
        return response;
      });
    })
  );
});
