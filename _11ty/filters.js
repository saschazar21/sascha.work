const pkg = require('../package.json');

const URL = process.env.DEPLOY_URL || pkg.homepage;

module.exports = {
  absoluteUrl: (path = '') => {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }
    const absolutePath = path.startsWith('/') ? path : `/${path}`;
    return `${URL}${absolutePath}`;
  },
};
