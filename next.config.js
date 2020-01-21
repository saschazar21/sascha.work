/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const highlight = require('rehype-highlight');
const emoji = require('remark-emoji');
const withMDXExtended = require('@saschazar/next-mdx-extended')({
  feed: {
    title: 'Sascha Zarhuber — Web Developer',
    home_page_url: 'https://sascha.work',
    feed_url: 'https://sascha.work/feed.json',
    description:
      'Personal website of Sascha Zarhuber — Web Developer with a strong focus on Open Source, Node.js, React, TypeScript and more. Loves photography and travelling as well. Contents include a blog, a resume and information about ongoing projects.',
    author: {
      name: 'Sascha Zarhuber',
      url: 'https://sascha.work'
    }
  },
  rehypePlugins: [highlight],
  remarkPlugins: [emoji]
});

module.exports = withMDXExtended({
  pageExtensions: ['tsx', 'ts', 'mdx', 'md'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack']
    });

    return config;
  }
});
