/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
const { injectManifest } = require('workbox-build');

const BUILD_DIR = 'out';
const SOURCE_DIR = __dirname;
const SW = 'sw.js';

const input = {
  swDest: join(process.cwd(), BUILD_DIR, SW),
  swSrc: join(SOURCE_DIR, SW),
  globDirectory: BUILD_DIR,
  globPatterns: ['**/*.{js,jpeg,jpg,png,ico,svg,html,css}'],
  globIgnores: [SW, '_next/**/*'],
  maximumFileSizeToCacheInBytes: 4000000,
};

injectManifest(input)
  .then(({ count, size, warnings }) => {
    warnings.forEach(console.warn);
    console.log(
      `The service worker ${BUILD_DIR}/${SW} has been generated with a precache list.\n`,
      `Contents include ${count} files, totaling ${size} bytes.`
    );
  })
  .catch(console.error);
