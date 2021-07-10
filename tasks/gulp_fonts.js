//const {dest, src} = require('gulp');
const GetGoogleFonts = require('get-google-fonts');
//
const googleFont = 'https://fonts.googleapis.com/css2?family=Raleway&display=swap';

const fonts = async function () {
  //
  const instance = new GetGoogleFonts({
    outputDir: './docs/assets/fonts',
    cssFile: './fonts.css'
  });
  //
  const result = await instance.download(googleFont);
  //
  return result;
};

module.exports = fonts;
