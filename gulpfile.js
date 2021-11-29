const {parallel, watch} = require('gulp');

const fonts = require('./tasks/gulp_fonts.js');
const images = require('./tasks/gulp_images.js');
const sass = require('./tasks/gulp_sass.js');

const watcher = () => {
  watch('./src/assets/images/**/*', {ignoreInitial: true}, images);
  watch('./src/sass/**/*.sass', {ignoreInitial: true}, sass);
};

exports.default = parallel(fonts, images, sass);

exports.watch = watcher;
