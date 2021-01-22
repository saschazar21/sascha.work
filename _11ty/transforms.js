const { minify: htmlmin } = require('html-minifier-terser');

const htmlminOptions = {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  removeComments: true,
};

module.exports = {
  htmlmin: (content, outputPath) =>
    outputPath && outputPath.endsWith('.html')
      ? htmlmin(content, htmlminOptions)
      : content,
};
