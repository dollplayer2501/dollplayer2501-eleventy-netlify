const {dest, src} = require('gulp');
const sassProcessor = require('gulp-sass')(require('sass'));

const isProduction = process.env.NODE_ENV === 'production';

const sass = function (cb) {
  return src('./src/sass/*.sass', {sourcemaps: !isProduction})
    .pipe(
      sassProcessor({
        outputStyle: isProduction ? 'compressed' : 'expanded'
      })
    )
    .pipe(dest('./src/_includes/.css', {sourcemaps: !isProduction}))
    .on('done', cb);
};

module.exports = sass;
