import React from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyleSheet = createGlobalStyle`
  :root {
    --color-primary: 140, 18%, 16%; /* #223127 */
    --color-secondary: 182, 68%, 17%; /* #0e4749 */
    --color-accent: 13, 97%, 46%; /* #E73504 */
    --color-grey: 37, 10%, 61%; /* #A59E92 */
    --color-bg-primary: 38, 24%, 93%; /* #F2EFEA */
    --color-bg-secondary: 78, 70%, 46%; /* #96C723 */

    --font-family-normal: 'Source Sans Pro', sans-serif;
    --font-family-mono: 'Fira Mono', monospace;
    --font-weight-normal: 300;
    --font-weight-mono: 500;
  }

  @media (prefers-color-scheme: dark) {
    :root:not(.light) {
      --color-primary: 38, 24%, 93%; /* #F2EFEA */
      --color-secondary: 78, 70%, 46%; /* #96C723 */
      --color-bg-primary: 140, 18%, 16%; /* #223127 */
      --color-bg-secondary: 182, 68%, 17%; /* #0e4749 */
    }
  }

  html {
    background-color: HSL(var(--color-bg-primary));
    color: HSL(var(--color-primary));
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
