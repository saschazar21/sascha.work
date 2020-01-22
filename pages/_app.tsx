import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components/macro';

import GlobalStyle from 'components/style';

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
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
