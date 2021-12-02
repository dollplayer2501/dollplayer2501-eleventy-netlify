//
// Eleventy
//

const htmlMinifier = require('html-minifier');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = function (value, outputPath) {
  if (!isProduction) {
    return value;
  }

  if (outputPath && outputPath.indexOf('.html') > -1) {
    return htmlMinifier.minify(value, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true
    });
  }

  return value;
};
