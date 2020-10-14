const { createHash } = require('crypto');
const day = require('dayjs');
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
  format: (date, format) => day(date).format(format),
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
  },
  padZero: (value, length = 2) => {
    const stringified = value.toString();
    const gap = length - stringified.length;
    if (gap < 0) {
      return stringified;
    }
    return new Array(gap)
      .fill(0)
      .reduce((prev, curr) => `${curr}${prev}`, stringified);
  },
  rewrite: (path, slug) =>
    slug || path.replace(/\d{4}-\d{2}-\d{2}_/, '').toLowerCase()
};
