const { absoluteUrl } = require('../../_11ty/filters');

const pkg = require('../../package.json');
const manifest = require('./manifest.json');

module.exports = {
  title: manifest.name,
  home_page_url: absoluteUrl(),
  description: manifest.description,
  feed_url: absoluteUrl('/feed.json'),
  icon: absoluteUrl(manifest.icons[1].src),
  favicon: absoluteUrl('/favicon.ico'),
  author: {
    name: pkg.author.name,
    url: pkg.author.url,
    avatar: absoluteUrl(
      'https://avatars2.githubusercontent.com/u/9016897?s=460',
    ),
  },
  expired: false,
};
