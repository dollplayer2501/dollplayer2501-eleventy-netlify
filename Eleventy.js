//
//
//
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
//
const {DateTime} = require('luxon');
//
const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItDeflist = require('markdown-it-deflist');
const markdownItTableOfContents = require('markdown-it-table-of-contents');

//
const htmlMinTransform = require('./tasks/eleventy_html-minifier.js');
//
const shortcodes = require('./tasks/eleventy_shortcodes.js');
//
const fs = require('fs');
//
const isProduction = process.env.NODE_ENV === 'production';

module.exports = function (eleventyConfig) {
  //
  eleventyConfig.setUseGitIgnore(false);

  //
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyRssPlugin);

  //
  eleventyConfig.addCollection('homeSections', async collectionApi => {
    return collectionApi
      .getFilteredByGlob('./src/sections/*.md')
      .sort((a, b) =>
        Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1
      );
  });

  //
  let markdownIt_options = {
    html: true,
    breaks: true,
    linkify: true
  };
  //
  let markdownItFootnote_options = {
    html: true,
    linkify: true,
    typographer: true
  };
  //
  let markdownItTableOfContents_options = {
    includeLevel: [3, 4, 5]
  };
  //
  let markdownLib = markdownIt(markdownIt_options)
    .use(markdownItFootnote, markdownItFootnote_options)
    .use(markdownItDeflist)
    .use(markdownItTableOfContents, markdownItTableOfContents_options);
  //
  markdownLib.renderer.rules.footnote_block_open = () =>
    '<section class="footnotes">\n' + '<h3>Footnotes...</h3>\n' + '<hr />\n' + '<ol>\n';

  //
  eleventyConfig.setLibrary('md', markdownLib);

  //
  if (isProduction) {
    eleventyConfig.addTransform('htmlMinifier', htmlMinTransform);
  }

  //
  eleventyConfig.addPassthroughCopy({'src/static/*.*': '/'});

  //
  eleventyConfig.addShortcode('youtubeEmbed', shortcodes.youtubeEmbed);
  eleventyConfig.addShortcode('nicovideoEmbed', shortcodes.nicovideoEmbed);

  //
  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLL yyyy');
  });

  //
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('docs/404.html');
        browserSync.addMiddleware('*', (req, res) => {
          res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
          res.write(content_404);
          res.end();
        });
      }
    },
    ui: false,
    ghostMode: false
  });

  //
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'docs'
    }
  };
};
