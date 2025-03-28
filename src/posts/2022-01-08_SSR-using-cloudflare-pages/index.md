---
page:
  title: SSR using Cloudflare Pages
public: true
related:
  - author: Nevi Shah et al.
    title: Cloudflare Pages Goes Full Stack
    url: https://blog.cloudflare.com/cloudflare-pages-goes-full-stack/
tags:
  - post
  - SSR
  - Preact
  - Vite
tldr: SSR is now possible using Cloudflare Pages too. By adding a custom _worker.js file to the distribution directory, incoming HTTP requests may be intercepted and customized.
---

# SSR using Cloudflare Pages

Among all the services Cloudflare is offering, [Workers](https://workers.cloudflare.com/) and [Pages](https://pages.cloudflare.com/) are probably standing out most for anyone thinking about deploying a web service and choosing Cloudflare as their platform of choice.

Yet, setting up the configuration for getting both services working in parallel may not be as straight forward as one would expect in the first place — Pages only offer statically generated website assets without any server-side rendered content, while Workers demand deploying a [Workers Site](https://developers.cloudflare.com/workers/platform/sites), with all static assets being served from Cloudflare's own key-value store.

Until now.

<mark><strong>Disclaimer</strong>: I am <strong>NOT</strong> affiliated with Cloudflare and/or other services mentioned in this blog post.</mark>

## Enter Pages Full Stack

While Pages is a fairly new addition to Cloudlfare's portfolio (being around for just about 9 months now), it had been designed as a static-site hosting service in the first place, together with the promise of integrating additional features over time.

One of the latest iterations in the Pages development is combining Pages with Workers, thus adding the possibility of API routes using either _file-based routing_, or intercepting any request directly using a bundled `_worker.js` file (similar to a Workers-only setup).

When using a dedicated \_worker.js file, it will be treated as 'single source of truth' when evaluating the incoming request, thus allowing for a more flexible and dynamic approach to the routing on the one hand, but on the other hand demanding a mandatory, manually created response in every case as well. That means, that there won't be any automatic fallback to static assets, unless explicitly defined in the_worker.js file.

File-based workers included in the _functions_ directory serve as extension of the bundled static assets and are therefore better suited for acting as API routes or proxies to other services. Their file path defines their route, e.g. `./functions/api/hello.js` becomes `/api/hello`.

## The Worker file

While Workers themselves are not new, the concept of including one \_worker.js file, or multiple workers as file-based route handlers is adding the benefit of custom routing and route-handling without a dedicated configuration. Plus, Cloudflare claims, the real benefit is to finally have iterative deployment previews for Workers too (until now, the Workers platform only supports a handful of environments, each overwriting themselves after a new build).

### How Workers work

For a \_workers.js file to be used among a static site, it needs to be included in the same output folder and follow the following ES module format:

```javascript
// _worker.js

export default {
  /**
   * @param {Request} request - the incoming request
   * @param {Env} env - the injected environment variables
   * @param {ExecutionContext} context - functions, e.g. waitUntil(), passThroughOnException()
   */
  async fetch(request, env, context) {
    // Redirect the request to the static assets
    return env.ASSETS.fetch(request);
  },
};
```

The above Worker is basically mirroring the current functionality of Pages, namely just serving any static asset included in the output folder.

## Example

An ideal use case for a combination of a Worker and a Pages setup is to render a single-page application on the server and hydrate it on the client. For this example, a newly scaffolded [Preact](https://preactjs.com) app using a [Vite](https://vitejs.dev) project is used.

The following shows a very barebone setup, which is not intended for any use in production, but serves as a starting point for future projects, once Wrangler v2 has become stable.

### Prerequisites

The following dependencies are mandatory for this example:

- [Node.js v14+](https://nodejs.org/en/download/) - the Node.js runtime, for running the example
- [Wrangler v2](https://github.com/cloudflare/wrangler2) - Cloudflare's build tool, in its latest iteration
- [preact-render-to-string](https://github.com/preactjs/preact-render-to-string) - for server-side-rendering Preact JSX to a string and including it in the HTML later on

### Scaffold the Vite project

Using the following wizard, it is possible to select a framework using a predefined template (such as _React_, _Vue_, etc...) — for this example, Preact should be selected as desired template. TypeScript is optional.

```bash
npm init vite@latest
```

### Add mandatory files for server-side-rendering

First, the contents of the `main.jsx` file should be adapted like the following. This will be the entry point for the client-side application and hydrate the app on the client.

```javascript
// src/main.jsx (or main.tsx, if using TypeScript)

import { h, hydrate, render } from 'preact';

// the root component of the Preact app
import { App } from './app';

// the DOM handle for the Preact app
const app = document.querySelector('#app');

import.meta.env.DEV // check for development mode
  ? render(<App />, app) // render the app on the dev server
  : hydrate(<App />, app); // hydrate the app on the production client
```

Second, the `_worker.js` file needs to be created:

```javascript
// _worker.js

import renderToString from 'preact-render-to-string';

// the root component of the Preact app
import { App } from './app';

export default {
  async fetch(request, env, context) {
    const { url } = request;
    const origin = new URL(url).origin;
    const pathname = new URL(url).pathname;

    // check for static assets
    // and redirect, if necessary
    if (pathname.startsWith('/assets')) {
      return env.ASSETS.fetch(request);
    }

    // otherwise, render the app on the server
    // by fetching the index.html and injecting the rendered app
    const index = await env.ASSETS.fetch(
      new URL('/', origin).toString(), // results to http://server-url/
    );

    // get text contents from the index.html
    const html = await index.text();

    // render the app on the server
    const app = renderToString(<App />);

    // inject the rendered app into the index.html
    const ssr = html.replace('<div id="app">', `<div id="app">${app}`);

    // return the rendered index.html
    return new Response(ssr, {
      headers: {
        'content-type': 'text/html',
      },
    });
  },
};
```

### Preview

The next step is to make sure the `_worker.js` file is included in the output folder after the Vite app has been built. This way, Wrangler will automatically include it in the preview using:

```bash
npx wrangler pages dev dist/
```

<mark>⚠️ <strong>Warning</strong>: The <code>\_worker.js</code> file needs to be bundled before being included in the output folder, otherwise the Wrangler preview will fail!</mark>

## Summary

As already mentioned above, the example included in this article contains only a very basic setup, therefore bugs or other issues are likely to occur. Some of them are listed below.

### How it works

The worker intercepts each request and analyzes the incoming request URL. If the URL matches a route to a static asset, it will act as a proxy for the static asset (vendor- & CSS-files, etc...) and serve it directly. For every other request, the worker will try to fetch the `index.html` file and inject the rendered app into it.

The main reason why the worker is trying to fetch the `index.html` from the output folder instead of importing it directly, is the fact, that the file in the output folder already includes the references to the JavaScript- and CSS-files. This way, the hydration of the client-side app may be performed without injecting those references beforehand.

### Caveats

Wrangler v2 itself is in a very early stage of development. Therefore there are some known issues and limitations, which may be looked up at the [issue tracker](https://github.com/cloudflare/wrangler2/issues) of its Github repository. For local experiments, it might be interesting to switch to its `alpha` branch, instead of `beta`, when installing it via npm.

The example above does not contain an appropriate handler for assets located in Vite's `public` folder. Therefore purely static assets (e.g. a robots.txt file) won't be served, unless placed in the `assets` folder, or handled otherwise within the worker (e.g. reading asset paths from a manifest file).
