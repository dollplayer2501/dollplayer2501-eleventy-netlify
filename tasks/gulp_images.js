const {dest, src} = require('gulp');
const imagemin = require('gulp-imagemin');

const isProduction = process.env.NODE_ENV === 'production';

const images = function (cb) {
  let dest_path = '';
  if (isProduction) {
    dest_path = './docs/assets/images';
  } else {
    dest_path = './_site/assets/images';
  }

  return src('./src/assets/images/**/*')
    .pipe(
      imagemin(
        [
          imagemin.mozjpeg({quality: 60, progressive: true}),
          imagemin.optipng({optimizationLevel: 5, interlaced: null})
        ],
        {
          silent: true
        }
      )
    )
    .pipe(dest(dest_path))
    .on('done', cb);
};

module.exports = images;
