//
// Eleventy
//

const CleanCSS = require('clean-css');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = function (value) {
  if (!isProduction) {
    return value;
  } else {
    return new CleanCSS({}).minify(value).styles;
  }
};
