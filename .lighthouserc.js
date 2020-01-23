const { data: { routes = [] } = {} } = require('./public/routes.json');
const { items = [] } = require('./public/feed.json');

const TEST_AMOUNT = 3;
const baseUrl = 'http://localhost:3000';
const baseRoutes = routes.map(r => r.path);
const blogPosts = new Array(TEST_AMOUNT)
  .fill(0)
  .map(() => items[Math.floor(Math.random() * items.length)].url);
const url = [...baseRoutes, ...blogPosts].map(u => `${baseUrl}${u}`);

module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'offscreen-images': 'off',
        'uses-webp-images': 'off',
        'uses-http2': 'off'
      }
    },
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'npx next start',
      url
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
