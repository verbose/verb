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
var remarked = require('remarked');
var _ = require('lodash');

module.exports = function (verb) {
  verb.options = verb.options || {};
  var utils = verb.utils;
  var tags = {};


  // remarked.js extras and defaults
  verb.options.markdown = verb.options.markdown || {};
  extras.init(verb.options.markdown);
  var markdownDefaults = extras.markdownDefaults;

  tags.html = function (patterns, options) {
    options = options || {};

    var opts = _.extend({}, {
      markdown: markdownDefaults,
      layouts: 'layouts',
      docs: verb.docs,
      ext: verb.ext,
      sep: '\n'
    }, verb.options, options);

    remarked.setOptions(opts);

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
        var content = utils.delims.escape(file.readFileSync(filepath));
        var page = verb.matter(content);

        // Extend the context
        var ctx = _.cloneDeep(verb.context, opts);
        var context = _.extend(ctx, verb.page.data, page.data);

        var output = verb.template(page.content, context);
        output = utils.adjust.headings(output);

        // Convert markdown to HTML
        var markup = remarked(output);

        // If a layout is defined in the options, use it
        if (opts.layout) {
          markup = verb.layout(markup, context, opts);
        }

        return markup;
      }).join(opts.sep);
    }
    return src;
  };

  return tags;
};