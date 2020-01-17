/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withMDXExtended = require('@saschazar/next-mdx-extended')({
  feed: {
    title: 'Sascha Zarhuber — Web Developer',
    home_page_url: 'https://sascha.work',
    feed_url: 'https://sascha.work/feed.json',
    description:
      'Personal website of Sascha Zarhuber, contains a blog, a resume and information about ongoing projects',
    author: {
      name: 'Sascha Zarhuber',
      url: 'https://sascha.work'
    }
  }
});

module.exports = withMDXExtended({
  pageExtensions: ['tsx', 'ts', 'mdx', 'md']
});
