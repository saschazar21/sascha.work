/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const highlight = require('rehype-highlight');
const emoji = require('remark-emoji');
const externalLinks = require('remark-external-links');
const slug = require('remark-slug');
const mdx = require('@saschazar/next-mdx-extended');

const manifest = require('./public/manifest.json');

const withMDXExtended = mdx({
  blogDir: 'posts',
  feed: {
    title: manifest.name,
    home_page_url: 'https://sascha.work',
    feed_url: 'https://sascha.work/feed.json',
    description: manifest.description,
    author: {
      name: 'Sascha Zarhuber',
      url: 'https://sascha.work',
    },
  },
  format: 'blog/YYYY/[title]',
  rehypePlugins: [highlight],
  remarkPlugins: [
    emoji,
    [
      externalLinks,
      { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] },
    ],
    slug,
  ],
});

module.exports = withMDXExtended({
  pageExtensions: ['tsx', 'ts', 'mdx', 'md'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
