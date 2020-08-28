const filters = require('./_eleventy/filters');

module.exports = (config) => {
  config.addPassthroughCopy({ '_data/**/*.json': './' });
  config.addPassthroughCopy({ _assets: 'assets' });

  Object.keys(filters).forEach((filter) =>
    config.addFilter(filter, filters[filter]),
  );

  return {
    dir: {
      input: 'pages',
      includes: '../_includes',
      data: '../_data',
      output: '_site',
    },
  };
};
