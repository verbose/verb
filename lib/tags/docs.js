/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var matter = require('gray-matter');
var file = require('fs-utils');
var matchname = require('../utils/matchname');
var _ = require('lodash');

module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;
  var page = {}, filepath;

  exports.docs = function (patterns, options) {

    if (typeof patterns === 'undefined') {
      throw new Error('{%= docs() %} tag name is undefined.');
    }

    var opts = _.extend({
      ext: '.md',
      docs: verb.docs + '**/*.md',
      sep: '\n',
      glob: {
        filter: 'isFile',
        matchBase: true
      }
    }, options, verbOpts);

    var userdocs = file.expand(opts.docs).map(utils.resolve);
    var local = matchname(userdocs, patterns);

    // Parse front matter in the docs
    if (local && local.length > 0) {
      filepath = String(local[0]);
      page = matter.read(filepath);
      // Extend context with metadata from front matter.
      var context = _.extend(_.cloneDeep(verb.context, opts), page.context);
      var result = verb.template(page.content, context);
      return utils.adjust.headings(result);
    } else {
      return;
    }

  };

  return exports;
};

