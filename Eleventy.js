//
//
//
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const sitemap = require('@quasibit/eleventy-plugin-sitemap');
//
const {DateTime} = require('luxon');
//
const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItDeflist = require('markdown-it-deflist');
const markdownItTableOfContents = require('markdown-it-table-of-contents');
const markdownItAnchor = require('markdown-it-anchor');
//
const htmlMinTransform = require('./tasks/eleventy_html-minifier.js');
const cssCleanFilter = require('./tasks/eleventy_css-clean.js');
//
const shortcodes = require('./tasks/eleventy_shortcodes.js');
//
const fs = require('fs');
//
const isProduction = process.env.NODE_ENV === 'production';
console.log('11ty Production Mode: ' + isProduction);

module.exports = function (eleventyConfig) {
  //
  eleventyConfig.setUseGitIgnore(false);

  //
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyRssPlugin);

  //
  eleventyConfig.addCollection('whoAmISections', async collectionApi => {
    return collectionApi
      .getFilteredByGlob('./src/sections/who_am_i_*.md')
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
    includeLevel: [3, 4, 5],
    containerClass: 'table-of-contents',
    markerPattern: /^\[\[toc\]\]/im,
    listType: 'ul',
    containerHeaderHtml:
      '<div class="toc-container-header"><h3>Table of contents</h3><hr /></div>',
    containerFooterHtml: ''
  };
  //
  let markdownLib = markdownIt(markdownIt_options)
    .use(markdownItFootnote, markdownItFootnote_options)
    .use(markdownItDeflist)
    .use(markdownItTableOfContents, markdownItTableOfContents_options)
    .use(markdownItAnchor);
  //
  markdownLib.renderer.rules.footnote_block_open = () =>
    '<section class="footnotes">\n' + '<h3>Footnotes...</h3>\n' + '<hr />\n' + '<ol>\n';

  //
  eleventyConfig.setLibrary('md', markdownLib);

  //
  eleventyConfig.addTransform('htmlMinifier', htmlMinTransform);
  eleventyConfig.addFilter('cssmin', cssCleanFilter);

  //
  eleventyConfig.addPassthroughCopy({'src/static/*.*': '/'});

  //
  eleventyConfig.addShortcode('youtubeEmbed', shortcodes.youtubeEmbed);
  eleventyConfig.addShortcode('nicovideoEmbed', shortcodes.nicovideoEmbed);

  //
  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLLL yyyy');
  });

  //
  let path_404 = '';
  if (isProduction) {
    path_404 = 'docs/404.html';
  } else {
    path_404 = '_site/404.html';
  }
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync(path_404);
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
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: 'https://dollplayer2501.netlify.app'
    }
  });

  //
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: '_site'
    }
  };
};
