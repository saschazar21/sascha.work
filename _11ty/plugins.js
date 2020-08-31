const ampPlugin = require('@ampproject/eleventy-plugin-amp');
const helmetPlugin = require('eleventy-plugin-helmet');
const { configFunction: jsonFeedPlugin } = require('eleventy-plugin-json-feed');
const pwaPlugin = require('eleventy-plugin-pwa');

module.exports = [
  [
    jsonFeedPlugin,
    {
      banner_image_metadata_field_name: 'cover',
      content_html: true,
      image_metadata_field_name: 'image',
      summary_metadata_field_name: 'tldr',
      tags_metadata_field_name: 'tags',
    },
  ],
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
