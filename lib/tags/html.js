/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var extras = require('marked-extras');
var file = require('fs-utils');
var marked = require('marked');
var matter = require('gray-matter');
var _ = require('lodash');


module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;

  // marked.js extras and defaults
  verbOpts.marked = verbOpts.marked || {};
  extras.init(verbOpts.marked);
  var markedDefaults = extras.markedDefaults;

  exports.html = function (patterns, options) {
    options = options || {};

    var opts = _.extend({}, {
      markdown: markedDefaults,
      layouts: 'layouts',
      docs: verb.docs,
      ext: verb.ext,
      sep: '\n'
    }, verbOpts, options);

    marked.setOptions(opts);

    // HTML layouts.
    opts.layouts = verb.cwd(opts.layouts);

    var src = '';
    var base = path.join(opts.docs, patterns);
    var localDocs = verb.cwd(base + '*');

    try {
      src = require(patterns);
    } catch (e) {
      src = file.expand(localDocs).map(function (filepath) {
        filepath = path.resolve(filepath);
        var page = matter.read(filepath);

        // Extend the context
        var ctx = _.cloneDeep(verb.context, opts);
        var context = _.extend(ctx, verb.page.context, page.context);

        var output = verb.template(page.content, context);
        output = utils.adjust.headings(output);

        // Convert markdown to HTML
        var markup = marked(output);

        // console.log(markup);
        // If a layout is defined in the options, use it
        if (opts.layout) {
          markup = verb.layout(markup, context, opts);
        }

        return markup;
      }).join(opts.sep);
    }
    return src;
  };

  return exports;
};