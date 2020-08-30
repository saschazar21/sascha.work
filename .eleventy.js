const filters = require('./_11ty/filters');
const plugins = require('./_11ty/plugins');
const transforms = require('./_11ty/transforms');

module.exports = config => {
  config.addPassthroughCopy({ '_data/**/*.json': './' });
  config.addPassthroughCopy({ public: './' });

  plugins.forEach(([plugin, pluginConfig]) =>
    config.addPlugin(plugin, pluginConfig)
  );

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
