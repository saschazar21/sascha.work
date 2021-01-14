const collections = require('./_11ty/collections');
const events = require('./_11ty/events');
const filters = require('./_11ty/filters');
const plugins = require('./_11ty/plugins');
const transforms = require('./_11ty/transforms');

module.exports = config => {
  config.addPassthroughCopy({ 'src/_data/**/*.json': './' });
  config.addPassthroughCopy({ public: './' });

  plugins.forEach(([plugin, pluginConfig]) =>
    config.addPlugin(plugin, pluginConfig)
  );

  Object.keys(collections).forEach(collection =>
    config.addCollection(collection, collections[collection])
  );

  Object.keys(filters).forEach(filter =>
    config.addFilter(filter, filters[filter])
  );

  Object.keys(transforms).forEach(transform =>
    config.addTransform(transform, transforms[transform])
  );

  Object.keys(events).forEach(event =>
    events[event].forEach(handler => config.on(event, handler))
  );

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'out',
    },
  };
};
