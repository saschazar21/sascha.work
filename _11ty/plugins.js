import { IdAttributePlugin } from '@11ty/eleventy';
import SyntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import EleventyHelmetPlugin from 'eleventy-plugin-helmet';

export default [
  [IdAttributePlugin, {}],
  [EleventyHelmetPlugin, {}],
  [SyntaxHighlightPlugin, {}],
];
