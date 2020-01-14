import React from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyleSheet = createGlobalStyle`
  :root {
    --font-family-normal: 'Source Sans Pro', sans-serif;
    --font-family-mono: 'Fira Mono', monospace;
    --font-weight-normal: 300;
    --font-weight-mono: 500;
  }

  @media (prefers-color-scheme: dark) {
    :root:not(.light) {
      /* TODO: define dark mode */
    }
  }

  html {
    background-color: var(--color-white, white);
    color: var(--color-black, black);
    font-family: var(--font-family-normal, sans-serif);
    font-weight: var(--font-weight-normal, 300);
    font-size: 16px;
    line-height: 1.65;
    box-sizing: border-box;
  }

  html * {
    box-sizing: inherit;
  }

  body {
    font-size: 1.5rem;
  }

  h1,h2,h3,h4,h5,h6,code {
    font-family: var(--font-family-mono, monospace);
    font-weight: var(--font-weight-normal, 500);
    line-height: 1.15;
  }

  h1 {
    margin-top: 0;
    font-size: 1.802em;
  }

  h2 {font-size: 1.602em;}

  h3 {font-size: 1.424em;}

  h4 {font-size: 1.266em;}

  h5 {font-size: 1.125em;}

  small, .text_small {font-size: 0.889em;}
`;

export default function GlobalStyles(): JSX.Element {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Fira+Mono:500|Source+Sans+Pro:300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyleSheet />
    </>
  );
}
