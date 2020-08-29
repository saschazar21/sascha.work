const filters = require('./_11ty/filters');
const transforms = require('./_11ty/transforms');

module.exports = config => {
  config.addPassthroughCopy({ '_data/**/*.json': './' });
  config.addPassthroughCopy({ _assets: 'assets' });

  Object.keys(filters).forEach(filter =>
    config.addFilter(filter, filters[filter])
  );

  Object.keys(transforms).forEach(transform =>
    config.addTransform(transform, transforms[transform])
  );

  return {
    dir: {
      input: 'pages',
      includes: '../_includes',
      data: '../_data',
      output: 'out',
    },
  };
};
