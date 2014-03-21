/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var matter = require('gray-matter');
var marked = require('marked');
var extras = require('marked-extras');
var _ = require('lodash');

module.exports = function (verb) {
  var verbOpts = _.extend({}, verb.options);
  var utils = verb.utils;

  // marked.js extras and defaults
  verbOpts.marked = verbOpts.marked || {};
  var markedDefaults = extras.markedDefaults;

  exports.html = function (patterns, options) {
    var opts = _.defaults({}, options, verbOpts, {
      ext: options.ext || verb.ext,
      layouts: 'layouts',
      docs: verb.docs,
      sep: '\n'
    }, markedDefaults);

    verb.ext = opts.ext;

    // HTML layouts.
    opts.layouts = verb.cwd(opts.docs, opts.layouts);

    // Set marked.js options
    extras.init(opts.marked);
    marked.setOptions(opts);

    var src = '';
    var base = path.join(opts.docs, patterns);
    var localDocs = verb.cwd(base + '*');

    try {
      src = require(patterns);
    } catch (e) {
      _.extend(verb.context, verb.page.context, opts);

      src = file.expand(localDocs).map(function (filepath) {
        filepath = path.resolve(filepath);
        var page = matter.read(filepath);

        // Extend the context
        _.extend(verb.context, page.context);

        var output = verb.template(page.content, verb.context);

        // Convert markdown to HTML
        var markup = marked(output);


        // If a layout is defined in the options, use it
        if (opts.layout) {
          markup = verb.layout(markup, verb.context, opts);
        }

        return markup;
      }).join(opts.sep);
    }
    return utils.adjust.headings(src);
  };

  return exports;
};