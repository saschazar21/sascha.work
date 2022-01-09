---
page:
  title: SSR using Cloudflare Pages
public: false
related:
  - author: Nevi Shah et al.
    title: Cloudflare Pages Goes Full Stack
    url: https://blog.cloudflare.com/cloudflare-pages-goes-full-stack/
tags:
  - post
  - SSR
  - Preact
tldr: SSR is now possible using Cloudflare Pages too. By adding a custom _worker.js file to the distribution directory, incoming HTTP requests may be intercepted and customized.
---

# SSR using Cloudflare Pages

Among all the services Cloudflare is offering, [Workers](https://workers.cloudflare.com/) and [Pages](https://pages.cloudflare.com/) are probably standing out most for anyone thinking about deploying a web service and choosing Cloudflare as their platform of choice.

Yet, setting up the configuration for getting both services working in parallel may not be as straight forward as one would expect in the first place — Pages only offer statically generated website assets without any server-side rendered content, while Workers demand deploying a [Workers Site](https://developers.cloudflare.com/workers/platform/sites), with all static assets being served from Cloudflare's own key-value store.

Until now.

> **Disclaimer**: I am _NOT_ affiliated with Cloudflare and/or other services mentioned in this blog post.

## Enter Pages Full Stack

While Pages is a fairly new service (being around for just about 9 months now), it had been designed as a static-site hosting service in the first place, together with the promise of integrating additional features over time.

One of the latest iterations in the Pages development is combining Pages with Workers, thus adding the possibility of API routes using either _file-based routing_, or intercepting any request directly using a bundled `_worker.js` file (similar to a Workers-only setup).
