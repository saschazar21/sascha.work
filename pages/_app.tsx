import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components/macro';

const theme = {
  // needs work
};

export default class WebsiteApp extends App {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
