const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    [
      'styled-components',
      {
        displayName: !isProd,
        fileName: !isProd,
        minify: isProd,
        pure: true,
        ssr: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          components: './components',
          layouts: './layouts',
        },
      },
    ],
  ],
  presets: ['next/babel'],
};
