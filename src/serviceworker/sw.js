/* eslint-disable no-undef */
// https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
// ------------------------------
// Pre Cache and Update
// ------------------------------
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);

const CACHE_PREFIX = 'sascha.work';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getCache = (name) => `${CACHE_PREFIX}-${name}`;

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: getCache('google-fonts-stylesheets'),
  })
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: getCache('google-fonts-webfonts'),
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/avatars0\.githubusercontent\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: getCache('avatars'),
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\/blog\/\d{4}\/.+/,
  new workbox.strategies.CacheFirst({
    cacheName: getCache('posts'),
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\/blog\/index\.html$/,
  new workbox.strategies.NetworkFirst({
    cacheName: getCache('pages'),
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\/(?:about|index|api_docs)\.html$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: getCache('pages'),
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 15,
        maxAgeSeconds: 60 * 60 * 24 * 7,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// inject Precache Manifest
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
