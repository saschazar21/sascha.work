const { absoluteURL } = require('../../_11ty/filters');

const pkg = require('../../package.json');
const manifest = require('./manifest.json');

module.exports = {
  title: manifest.name,
  home_page_url: absoluteURL(),
  description: manifest.description,
  feed_url: absoluteURL('/feed.json'),
  icon: absoluteURL(manifest.icons[1].src),
  favicon: absoluteURL('/favicon.ico'),
  author: {
    name: pkg.author.name,
    url: pkg.author.url,
    avatar: absoluteURL(
      'https://avatars2.githubusercontent.com/u/9016897?s=460',
    ),
  },
  expired: false,
};
