const {dest, src} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sassProcessor = require('gulp-sass');
sassProcessor.compiler = require('sass');

const isProduction = process.env.NODE_ENV === 'production';
const criticalStyles = ['critical.sass', 'who_am_i.sass'];

const calculateOutput = ({history}) => {
  let response = './docs/css';
  const sourceFileName = /[^/]*$/.exec(history[0])[0];
  if (criticalStyles.includes(sourceFileName)) {
    response = './src/_includes/css';
  }

  return response;
};

//
const sass = function (cb) {
  return src('./src/sass/*.sass')
    .pipe(sassProcessor().on('error', sassProcessor.logError))
    .pipe(
      cleanCSS(
        isProduction
          ? {
              level: 2
            }
          : {}
      )
    )
    .pipe(dest(calculateOutput, {sourceMaps: !isProduction}))
    .on('done', cb);
};

module.exports = sass;
