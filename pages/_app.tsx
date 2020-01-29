import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components/macro';

import GlobalStyle from 'components/style';
import ld from 'components/profile/profile';

import manifest from 'public/manifest.json';
import pkg from 'package.json';

const theme = {
  // needs work
};

export default class WebsiteApp extends App {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Sascha Zarhuber — Web Developer</title>
          <link rel="preconnect" href="https://cdn.ampproject.org" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link
            rel="icon"
            sizes="16x16"
            href="/img/favicon-16.png"
            type="image/png"
          />
          <link
            rel="icon"
            sizes="32x32"
            href="/img/favicon-32.png"
            type="image/png"
          />
          <link
            rel="icon"
            sizes="32x32 48x48"
            href="/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/img/icon-192.png"
            type="image/png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/img/icon-512.png"
            type="image/png"
          />
          <meta name="theme-color" content={manifest.theme_color} />
          <meta name="author" content="Sascha Zarhuber" />
          <meta name="description" content={manifest.description} />
          <meta name="generator" content={`Next.js ${pkg.dependencies.next}`} />
          <meta name="robots" content="index,follow" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
          <script
            async
            custom-element="amp-install-serviceworker"
            src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
        <amp-install-serviceworker
          src="/sw.js"
          data-iframe-src="https://sascha.work/serviceworker.html"
          layout="nodisplay"
        ></amp-install-serviceworker>
      </>
    );
  }
}
