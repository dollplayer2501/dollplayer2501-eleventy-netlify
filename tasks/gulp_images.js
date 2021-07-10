const {dest, src} = require('gulp');
const imagemin = require('gulp-imagemin');

const images = function (cb) {
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
    .pipe(dest('./docs/assets/images'))
    .on('done', cb);
};

module.exports = images;
