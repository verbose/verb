/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const extras = require('marked-extras');
const file = require('fs-utils');
const marked = require('marked');
const _ = require('lodash');

module.exports = function (verb) {
  verb.options = verb.options || {};
  var utils = verb.utils;
  var tags = {};


  // marked.js extras and defaults
  verb.options.marked = verb.options.marked || {};
  extras.init(verb.options.marked);
  var markedDefaults = extras.markedDefaults;

  tags.html = function (patterns, options) {
    options = options || {};

    var opts = _.extend({}, {
      markdown: markedDefaults,
      layouts: 'layouts',
      docs: verb.docs,
      ext: verb.ext,
      sep: '\n'
    }, verb.options, options);

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
        var content = utils.delims.escape(file.readFileSync(filepath));
        var page = verb.matter(content);

        // Extend the context
        var ctx = _.cloneDeep(verb.context, opts);
        var context = _.extend(ctx, verb.page.data, page.data);

        var output = verb.template(page.content, context);
        output = utils.adjust.headings(output);

        // Convert markdown to HTML
        var markup = marked(output);

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