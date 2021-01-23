---
page:
  title: About Teaser Cards
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

# About Teaser Cards

Ever seen one of those fancy preview (or teaser) cards in your social media timeline? Always thought that extra effort for your own blog just doesn't pay off?<br />
Well, I thought so too, until I read [Stefan's](https://fettblog.eu/) article ["11ty: Generate Twitter cards automatically"](https://fettblog.eu/11ty-automatic-twitter-cards/).

## What's included?

Of course I recommend reading Stefan's article, as I won't go into detail setting up the SVG template pagination. This blog post concentrates purely on integrating the transformation step of SVG to PNG into [Eleventy](https://11ty.dev), without the use of external build-pipeline tools like _Gulp_.

## Prerequisites

As this article mainly targets users of Eleventy, it is of course a bit biased. Nevertheless, there should be an adequate alternative on other static site generators.

The following list should contain everything needed to generate teaser cards on your Eleventy website:

- [Eleventy v0.11.1](https://11ty.dev) (`v0.11.1` is needed for supporting the [afterBuild](https://www.11ty.dev/docs/events/#afterbuild) event handler)
- [Sharp v0.27.0](https://sharp.pixelplumbing.com/) (should be included in Eleventy already, but versions below `v0.27.0` seem to have issues rendering SVG &lt;text&gt; properly)

That's it. All that's left is configuring Eleventy.

## Try it

I created a small demo on [repl.it](https://repl.it/@saschazar/transform-svg-to-png), which prints the mime type after Sharp finished transforming the SVG into PNG.
