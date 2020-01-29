import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';

import FontStyleSheet from 'components/style/typography';
export { CodeHighlight } from 'components/style/mdx';

export const GlobalStyleSheet = createGlobalStyle`
  :root {
    --color-primary: 140, 18%, 16%; /* #223127 */
    --color-secondary: 182, 68%, 27%; /* #0e4749 */
    --color-accent: 13, 97%, 39%; /* #E73504 */
    --color-grey: 37, 10%, 61%; /* #A59E92 */
    --color-bg-primary: 38, 24%, 93%; /* #F2EFEA */
    --color-bg-secondary: 78, 70%, 46%; /* #96C723 */

    --font-family-normal: 'Source Sans Pro', sans-serif;
    --font-family-mono: 'Fira Mono', monospace;
    --font-weight-normal: 400;
    --font-weight-strong: 600;
    --font-weight-mono: 500;

    &.dark {
      --color-primary: 38, 24%, 95%; /* #F2EFEA */
      --color-secondary: 78, 70%, 46%; /* #96C723 */
      --color-accent: 13, 97%, 66%; /* #E73504 */
      --color-bg-primary: 140, 5%, 10%; /* #223127 */
      --color-bg-secondary: 182, 68%, 17%; /* #0e4749 */
    }
  }

  @media screen and (prefers-color-scheme: dark) {
    :root:not(.light) {
      --color-primary: 38, 24%, 95%; /* #F2EFEA */
      --color-secondary: 78, 70%, 46%; /* #96C723 */
      --color-accent: 13, 97%, 66%; /* #E73504 */
      --color-bg-primary: 140, 5%, 10%; /* #223127 */
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
    margin: 0;
    font-size: 1.25rem;
  }
  
  a {
    transition: color 200ms ease-in;
    color: HSLA(var(--color-primary), 0.75);
    text-decoration: none;
    border-bottom: 1px dashed HSLA(var(--color-primary), 0.6);

    &:focus,
    &:hover,
    &:visited {
      color: HSL(var(--color-primary));
    }

    &:focus {
      outline: hsl(var(--color-accent)) dotted 2px;
    }
  }

  strong {
    font-weight: var(--font-weight-strong);
  }

  h1, h2, h3, h4, h5 {
    font-family: var(--font-family-mono, monospace);
    font-weight: var(--font-weight-normal, 500);
    line-height: 1.15;
  }

  code { font-family: var(--font-family-mono, monospace); }

  h1 {
    margin-top: 0;
    font-size: 1.802em;
  }

  h2 {font-size: 1.602em;}

  h3 {font-size: 1.424em;}

  h4 {font-size: 1.266em;}

  h5 {font-size: 1.125em;}

  small, .text_small {font-size: 0.889em;}

  @media screen and (min-width: 768px) {
    h1 {
      margin-top: 0;
      font-size: 3.052em;
    }

    h2 {font-size: 2.441em;}

    h3 {font-size: 1.953em;}

    h4 {font-size: 1.563em;}

    h5 {font-size: 1.25em;}

    small, .text_small {font-size: 0.8em;}
  }

  @media print {
    html {
      font-size: 12pt;
      line-height: 1.0;
    }

    body {
      font-size: 1rem;
    }

    a {
      text-decoration: none;
      border-bottom: none;

      &[href]::after {
        content: ", (" attr(href) ")";
      }
    }
  }
`;

export default function GlobalStyles(): JSX.Element {
  return (
    <>
      <FontStyleSheet />
      <GlobalStyleSheet />
    </>
  );
}
