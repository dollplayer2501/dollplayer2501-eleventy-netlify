//
// Eleventy
//

const htmlMinifier = require('html-minifier');

module.exports = function (value, outputPath) {
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
