const pkg = require('../package.json');

module.exports = {
  absoluteUrl: (path = '') => {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }
    const absolutePath = path.startsWith('/') ? path : `/${path}`;
    return `${pkg.homepage}${absolutePath}`;
  },
};
