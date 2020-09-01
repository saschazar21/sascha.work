const ampPlugin = require('@ampproject/eleventy-plugin-amp');
const helmetPlugin = require('eleventy-plugin-helmet');
const jsonFeedPlugin = require('eleventy-plugin-json-feed');
const pwaPlugin = require('eleventy-plugin-pwa');
const rssPlugin = require('@11ty/eleventy-plugin-rss');

const isProd = process.env.NODE_ENV === 'production';

module.exports = [
  [
    jsonFeedPlugin,
    {
      banner_image_metadata_field_name: 'cover.src',
      content_html: true,
      image_metadata_field_name: 'image',
      summary_metadata_field_name: 'tldr',
      tags_metadata_field_name: 'tags'
    }
  ],
  [rssPlugin, {}],
  [helmetPlugin, {}],
  [
    ampPlugin,
    {
      filter: /(?<!serviceworker)\/index\.html/i
    }
  ],
  [
    pwaPlugin,
    {
      swDest: 'out/sw.js'
    }
  ]
];
