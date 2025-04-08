import bundles from './_11ty/bundles.js';
import plugins from './_11ty/plugins.js';
import collections from './_11ty/collections.js';
import events from './_11ty/events.js';
import filters from './_11ty/filters.js';
import transforms from './_11ty/transforms.js';

const DEFAULT_TEMPLATE_ENGINE = 'njk';

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy({
    'src/_data/**/*.json': '/',
  });

  plugins.forEach(([plugin, pluginConfig]) =>
    eleventyConfig.addPlugin(plugin, pluginConfig),
  );

  Object.keys(bundles).forEach((bundle) =>
    eleventyConfig.addBundle(bundle, bundles[bundle]),
  );

  Object.keys(collections).forEach((collection) =>
    eleventyConfig.addCollection(collection, collections[collection]),
  );

  Object.keys(filters).forEach((filter) =>
    eleventyConfig.addFilter(filter, filters[filter]),
  );

  Object.keys(transforms).forEach((transform) =>
    eleventyConfig.addTransform(transform, transforms[transform]),
  );

  Object.keys(events).forEach((event) =>
    events[event].forEach((handler) => eleventyConfig.on(event, handler)),
  );

  eleventyConfig.addWatchTarget('src/**/*');
}

export const config = {
  dir: {
    input: 'src',
    includes: '_partials',
    layouts: '_layouts',
    data: '_data',
    output: 'public',
  },
  htmlTemplateEngine: DEFAULT_TEMPLATE_ENGINE,
  markdownTemplateEngine: DEFAULT_TEMPLATE_ENGINE,
  templateFormats: ['html', 'md', 'njk'],
};
