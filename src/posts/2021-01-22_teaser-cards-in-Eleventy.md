---
page:
  title: Teaser Cards in Eleventy
public: true
related:
  - author: Stefan Baumgartner
    title: '11ty: Generate Twitter cards automatically'
    url: https://fettblog.eu/11ty-automatic-twitter-cards/
tags:
  - post
  - Eleventy
  - SVG
  - Social Media
tldr: Creating teaser cards for social media now also works using Sharp v0.27 in your Eleventy setup.
---

# Teaser Cards in Eleventy

Ever seen one of those fancy preview (or teaser) cards in your social media timeline? Always thought that extra effort for your own blog just doesn't pay off?<br />
Well, I thought so too, until I read [Stefan's](https://fettblog.eu/) article ["11ty: Generate Twitter cards automatically"](https://fettblog.eu/11ty-automatic-twitter-cards/).

## What's included?

Of course I recommend reading Stefan's article, as I won't go into detail setting up the SVG template pagination. This blog post concentrates purely on integrating the transformation step of SVG to PNG into [Eleventy](https://11ty.dev), without the use of external build-pipeline tools like _Gulp_.

## Prerequisites

As this article mainly targets users of Eleventy, it is of course a bit biased. Nevertheless, there should be an adequate alternative on other static site generators.

The following list should contain everything you need for generating teaser cards in your Eleventy website:

- [Eleventy v0.11.1](https://11ty.dev) &mdash; `v0.11.1` is needed for supporting the [afterBuild](https://www.11ty.dev/docs/events/#afterbuild) event handler
- [Sharp v0.27.0](https://sharp.pixelplumbing.com/) &mdash; should be included in Eleventy already, but versions below `v0.27.0` seem to have issues rendering SVG &lt;text&gt; properly
- [globby](https://github.com/sindresorhus/globby#readme) &mdash; or similar, for glob matching `.svg` files

That's it. All that's left is configuring Eleventy.

## Using Eleventy's afterBuild event

I assume you've followed Stefan's article to the point, where the SVGs are created using Eleventy's pagination functionality. If not, I'd invite you to pay close attention to the [Creating an SVG](https://fettblog.eu/11ty-automatic-twitter-cards/#creating-an-svg) section, as this will be the base for everything that follows.

To make use of the _afterBuild_ event, you have to register an event handler in your `.eleventy.js` configuration file:

```js
// .eleventy.js
const globby = require('globby');
const { join, dirname } = require('path');
const sharp = require('sharp');

module.exports = (eleventyConfig) => {
  eleventyConfig.on('afterBuild', async () => {
    const svgs = await globby('./out/posts/**/*.svg');
    return Promise.all(
      svgs.map((p) =>
        sharp(p)
          .toFormat('png')
          .toFile(join(dirname(p), '/teaser.png')),
      ),
    );
  });
};
```

The above piece of code does the following:

1. register an `async` function to the _afterBuild_ event,
1. glob match available `.svg` files in the destination directory of your paginated SVG templates,
1. iterate over resolved paths and transform them via `sharp`,
   - `toFormat()` accepts various image formats, such as `png`, `jpeg`, `webp`, etc... (see [Sharp's documentation](https://sharp.pixelplumbing.com/api-output#toformat) for supported formats). However, it's suggested to use either `png` or `jpeg` for social media images.

## Try it

I created a small demo on [runkit](https://runkit.com/saschazar21/transform-svg-to-png), which explains the whole process step by step. While the runkit notebook seems to work with a lower Sharp version as well, I experienced issues in combination with Eleventy on my local machine. That's why I initially suggested to use Sharp v0.27.

## Conclusion

There you have it. Using the steps mentioned above, your Eleventy setup should be able automatically create PNG files from your paginated SVG templates when executing the `build` command.

**⚠️ Caution:** here be dragons! Sharp only supports very basic SVG to say the least. I've experienced some issues when trying to use gradients &mdash; even the font kerning is inexistent. However, if you plan to mostly use basic SVG elements styled using `fill` & `stroke`, you should be good to go.
