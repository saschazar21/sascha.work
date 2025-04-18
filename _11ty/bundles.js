import { join } from 'path';
import { build, transform } from 'esbuild';

const REPLACEMENTS = {
  __HOSTNAME__: JSON.stringify(
    new URL(
      process.env.CONTEXT === 'production'
        ? process.env.URL
        : process.env.DEPLOY_URL || 'http://localhost:8080',
    ).hostname,
  ),
  __IS_PROD__: JSON.stringify(process.env.CONTEXT === 'production'),
  __VERSION__: JSON.stringify(process.env.SHORT_SHA || 'dev'),
};

export default {
  css: {
    outputFileExtension: 'css',
    toFileDirectory: 'css',
    transforms: [
      async (contents) =>
        transform(contents, {
          loader: 'css',
          minify: process.env.CONTEXT === 'production',
          minifyWhitespace: process.env.CONTEXT === 'production',
        }).then((result) => result.code),
    ],
  },
  js: {
    outputFileExtension: 'js',
    toFileDirectory: 'js',
    transforms: [
      async (contents) => {
        const bundle = await build({
          stdin: {
            contents,
            resolveDir: join(process.cwd(), 'src/_scripts'),
            loader: 'ts',
          },
          bundle: true,
          define: REPLACEMENTS,
          format: 'esm',
          treeShaking: process.env.CONTEXT === 'production',
          write: false,
        });

        const concatenated = bundle.outputFiles.reduce((result, { text }) => {
          result += text;
          return result;
        }, '');

        return transform(concatenated, {
          define: REPLACEMENTS,
          loader: 'js',
          minify: process.env.CONTEXT === 'production',
          minifyWhitespace: process.env.CONTEXT === 'production',
          treeShaking: process.env.CONTEXT === 'production',
        }).then((result) => result.code);
      },
    ],
  },
  json: {
    hoist: false,
    outputFileExtension: 'json',
    toFileDirectory: 'json',
    transforms: [
      async (contents) =>
        JSON.stringify(
          JSON.parse(contents),
          null,
          process.env.CONTEXT === 'production' ? null : 2,
        ),
    ],
  },
};
