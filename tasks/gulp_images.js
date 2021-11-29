const {dest, src} = require('gulp');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');

const isProduction = process.env.NODE_ENV === 'production';

const images = function (cb) {
  let dest_path = '';
  if (isProduction) {
    dest_path = './docs/assets/images';
  } else {
    dest_path = './_site/assets/images';
  }

  return src('./src/assets/images/**/*')
    .pipe(changed(dest_path))
    .pipe(
      imagemin(
        [
          pngquant({
            quality: [0.6, 0.7],
            speed: 1
          }),
          mozjpeg({quality: 65}),
          imagemin.svgo(),
          imagemin.optipng(),
          imagemin.gifsicle({optimizationLevel: 3})
        ],
        {
          silent: false
        }
      )
    )
    .pipe(dest(dest_path))
    .on('done', cb);
};

module.exports = images;

//
// Using LastRun instead of gulp-changed
//
// const {dest, lastRun, src} = require('gulp');
// return src('./src/assets/images/**/*', {since: lastRun(images)});
//
// gulp-imagemin ver. 8.0.0 can not use, because "Must use import to load ES Module" error.
// If using it, change to rewrite CommonJS (require) to ES Modules (import).
//
