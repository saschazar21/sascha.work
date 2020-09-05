const { createHash } = require('crypto');
const { URL } = require('url');

const pkg = require('../package.json');

const domain = process.env.DEPLOY_URL || pkg.homepage;

module.exports = {
  absoluteUrl: (path = '') => {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }
    const absolutePath = path.startsWith('/') ? path : `/${path}`;
    return `${domain}${absolutePath}`;
  },
  gravatar: (email, size = 256) => {
    if (!email || !email.length) {
      throw new Error('No email given to calculate Gravatar hash!');
    }

    const hash = createHash('md5').update(email).digest('hex');
    const url = new URL(
      `/avatar/${hash}?s=${size}`,
      'https://www.gravatar.com'
    );
    return url.toString();
  }
};
