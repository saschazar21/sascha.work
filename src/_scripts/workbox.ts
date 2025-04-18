import { clientsClaim, setCacheNameDetails } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';

declare global {
  interface Window {
    __WB_MANIFEST: Array<{ url: string; revision: string }>;
    skipWaiting: () => void;
  }
}

declare var __VERSION__: string;
declare var __HOSTNAME__: string;
declare var __IS_PROD__: boolean;

self.__WB_DISABLE_DEV_LOGS = __IS_PROD__;

setCacheNameDetails({
  prefix: __HOSTNAME__,
  suffix: __VERSION__,
  precache: 'precache',
  runtime: 'runtime-cache',
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => {
    return request.destination === 'document';
  },
  new NetworkFirst({
    cacheName: 'document-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        maxEntries: 20,
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

registerRoute(
  /^https:\/\/cdn\.jsdelivr\.net\/npm\/.+$/,
  new CacheFirst({
    cacheName: 'jsdelivr-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 365 * 24 * 60 * 60, // 365 Days
        maxEntries: 50,
        purgeOnQuotaError: true,
      }),
    ],
  }),
  'GET',
);

registerRoute(
  ({ request }) => {
    return request.destination === 'style';
  },
  new StaleWhileRevalidate({
    cacheName: 'css-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        maxEntries: 50,
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => {
    return request.destination === 'script';
  },
  new StaleWhileRevalidate({
    cacheName: 'js-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        maxEntries: 30,
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => {
    return request.destination === 'image';
  },
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        maxEntries: 50,
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => {
    return request.destination === 'font';
  },
  new CacheFirst({
    cacheName: 'font-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 365 * 24 * 60 * 60, // 365 Days
        maxEntries: 10,
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

self.addEventListener('activate', (event) => {
  (event as unknown as { waitUntil: (value: void) => void }).waitUntil(
    clientsClaim(),
  );

  (
    event as unknown as { waitUntil: (value: Promise<boolean[]>) => void }
  ).waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheName.endsWith(__VERSION__)) {
            return caches.delete(cacheName);
          }
          return false;
        }),
      );
    }),
  );
});

self.addEventListener('install', (_event) => {
  self.skipWaiting();
});
