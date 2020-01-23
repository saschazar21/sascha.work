import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components/macro';

import GlobalStyle from 'components/style';

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
            sizes="192x192"
            href="/img/icon-192.png"
            type="image/png"
          />
          <link
            rel="icon"
            sizes="512x512"
            href="/img/icon-512.png"
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
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
