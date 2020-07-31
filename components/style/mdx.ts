import { createGlobalStyle } from 'styled-components';

export const CodeHighlight = createGlobalStyle`
  /* Comment */
  .hljs-comment,
  .hljs-quote {
    color: #d4d0ab;
  }
  /* Red */
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-regexp,
  .hljs-deletion {
    color: #ffa07a;
  }
  /* Orange */
  .hljs-number,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params,
  .hljs-meta,
  .hljs-link {
    color: #f5ab35;
  }
  /* Yellow */
  .hljs-attribute {
    color: #ffd700;
  }
  /* Green */
  .hljs-string,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: #abe338;
  }
  /* Blue */
  .hljs-title,
  .hljs-section {
    color: #00e0e0;
  }
  /* Purple */
  .hljs-keyword,
  .hljs-selector-tag {
    color: #dcc6e0;
  }
  .hljs {
    display: block;
    overflow-x: auto;
    background: #2b2b2b;
    color: #f8f8f2;
    padding: 1.25rem;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
  @media print, screen and (-ms-high-contrast: active) {
    .hljs-addition,
    .hljs-attribute,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-bullet,
    .hljs-comment,
    .hljs-link,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-params,
    .hljs-string,
    .hljs-symbol,
    .hljs-type,
    .hljs-quote {
          color: highlight;
      }
      .hljs-keyword,
      .hljs-selector-tag {
          font-weight: bold;
      }
  }

  @media screen and (prefers-color-scheme: dark) {
    html:not(.light) {
      /* Tomorrow Comment */
      .hljs-comment,
      .hljs-quote {
        color: #6a6a69;
      }
      /* Tomorrow Red */
      .hljs-variable,
      .hljs-template-variable,
      .hljs-tag,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class,
      .hljs-regexp,
      .hljs-deletion {
        color: #c82829;
      }
      /* Tomorrow Orange */
      .hljs-number,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params,
      .hljs-meta,
      .hljs-link {
        color: #864910;
      }
      /* Tomorrow Yellow */
      .hljs-attribute {
        color: #8a6c00;
      }
      /* Tomorrow Green */
      .hljs-string,
      .hljs-symbol,
      .hljs-bullet,
      .hljs-addition {
        color: #4d6001;
      }
      /* Tomorrow Blue */
      .hljs-title,
      .hljs-section {
        color: #355a8a;
      }
      /* Tomorrow Purple */
      .hljs-keyword,
      .hljs-selector-tag {
        color: #6f4888;
      }
      .hljs {
        display: block;
        overflow-x: auto;
        background: #f0f0f0;
        color: #4d4d4c;
        padding: 1.25rem;
      }
      .hljs-emphasis {
        font-style: italic;
      }
      .hljs-strong {
        font-weight: bold;
      }
    }
  }

  @media print {
    .hljs {
      background: hsl(var(--color-bg-primary));
      color: hsl(var(--color-primary));
    }
  }
`;

export default CodeHighlight;
