/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var matter = require('gray-matter');
var marked = require('marked');
var extras = require('marked-extras');
var _ = require('lodash');



module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var utils = phaser.utils;

  // marked.js extras and defaults
  phaserOpts.marked = phaserOpts.marked || {};
  var markedDefaults = extras.markedDefaults;

  exports.html = function (patterns, options) {
    var opts = _.defaults({}, options, phaserOpts, {
      ext: options.ext || phaser.ext,
      sep: '\n'
    }, markedDefaults);

    phaser.ext = opts.ext;

    console.log(opts);

    // HTML layouts
    opts.layouts = opts.layouts || phaser.base;

    // Set marked.js options
    extras.init(opts.marked);
    marked.setOptions(opts);

    var src = '';

    try {
      src = require(patterns);
    } catch(e) {
      var localDocs = path.join(phaser.base, 'docs', patterns);
      src = file.expand(localDocs).map(function(filepath) {
        filepath = path.resolve(filepath);

        var str = file.readFileSync(filepath);
        var page  = matter(str);

        // Extend the context
        phaser.page.context = _.extend(
          phaser.context,
          phaser.page.context,
          options,
          page.context
        );

        var output = phaser.template(page.content, phaser.page.context);

        // Convert markdown to HTML
        var markup = marked(output);

        // If a layout is defined in the options, use it
        if(opts.layout) {
          markup = phaser.layout(markup, phaser.page.context, opts);
        }

        return markup;
      }).join(opts.sep);
    }
    return utils.adjust.headings(src);
  };

  return exports;
};