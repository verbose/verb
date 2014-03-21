/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var matter = require('gray-matter');
var _ = require('lodash');
var includes = require('verb-readme-includes');

module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;

  exports.include = function (patterns, options) {
    var name = patterns;
    var templates = [];

    if (typeof name === 'undefined') {
      throw new Error('{%= include() %} tag name is undefined.');
    }

    var opts = _.extend({
      ext: '.md',
      sep: '\n',
      glob: {
        filter: 'isFile',
        matchBase: true
      }
    }, options, verbOpts);

    if(opts.includes) {
      templates = _.union([], templates, utils.lookup(opts.includes, name, opts.glob));
    }

    // If knownIncludes is defined in the options, only use
    // includes that are defined by the user.
    if(!opts.knownIncludes) {
      templates = _.union([], templates, utils.lookup(includes, name, opts.glob));
    }

    var output = _.flatten(templates).map(function(filepath) {
      // Parse front matter in the include
      var page = matter.read(filepath);
      // Extend context with metadata from front matter.
      var context = _.extend(_.cloneDeep(verb.context, opts), page.context);
      return verb.template(page.content, context);
    }).join(opts.sep);

    return utils.adjust.headings(output);
  };

  return exports;
};

