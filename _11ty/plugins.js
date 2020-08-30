const ampPlugin = require('@ampproject/eleventy-plugin-amp');
const helmetPlugin = require('eleventy-plugin-helmet');
const pwaPlugin = require('eleventy-plugin-pwa');

module.exports = [
  [helmetPlugin, {}],
  [
    ampPlugin,
    {
      filter: /(?<!serviceworker)\/index\.html/i,
    },
  ],
  [
    pwaPlugin,
    {
      swDest: 'out/sw.js',
    },
  ],
];
