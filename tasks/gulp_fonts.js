//const {dest, src} = require('gulp');
const GetGoogleFonts = require('get-google-fonts');
//
const googleFont = 'https://fonts.googleapis.com/css2?family=Raleway&display=swap';
//
const isProduction = process.env.NODE_ENV === 'production';

//
const fonts = async function () {
  let dest_path = '';
  if (isProduction) {
    dest_path = './docs/assets/fonts';
  } else {
    dest_path = './_site/assets/fonts';
  }

  //
  const instance = new GetGoogleFonts({
    outputDir: dest_path,
    cssFile: './fonts.css'
  });
  //
  const result = await instance.download(googleFont);
  //
  return result;
};

module.exports = fonts;
