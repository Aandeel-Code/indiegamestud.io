const imageCacheName = 'indie-game-studio-images-v1'
const maximumCachedImages = 96

const trimImageCache = async (cache) => {
  const requests = await cache.keys()

  if (requests.length <= maximumCachedImages) {
    return
  }

  await Promise.all(
    requests
      .slice(0, requests.length - maximumCachedImages)
      .map((request) => cache.delete(request)),
  )
}

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches
        .keys()
        .then((names) =>
          Promise.all(
            names
              .filter((name) => name.startsWith('indie-game-studio-images-') && name !== imageCacheName)
              .map((name) => caches.delete(name)),
          ),
        ),
    ]),
  )
})

self.addEventListener('fetch', (event) => {
  const {request} = event
  const url = new URL(request.url)

  if (
    request.method !== 'GET' ||
    request.destination !== 'image' ||
    url.origin !== self.location.origin ||
    !url.pathname.startsWith('/assets/') ||
    request.headers.has('range')
  ) {
    return
  }

  event.respondWith(
    caches.open(imageCacheName).then(async (cache) => {
      const cachedResponse = await cache.match(request)

      if (cachedResponse) {
        return cachedResponse
      }

      const networkResponse = await fetch(request)

      if (networkResponse.ok) {
        try {
          await cache.put(request, networkResponse.clone())
          await trimImageCache(cache)
        } catch {
          return networkResponse
        }
      }

      return networkResponse
    }),
  )
})
