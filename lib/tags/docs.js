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


module.exports = function (verb) {
  var verbOpts = _.extend({}, verb.options);
  var utils = verb.utils;

  exports.docs = function (patterns, options) {
    var name = patterns;
    var opts = _.extend({sep: '\n'}, options, verbOpts);

    if (typeof name === 'undefined') {
      throw new Error('{%= docs() %} tag name is undefined.');
    }

    var userDefined = [];
    if(opts.docs) {
      userDefined = utils.lookup(opts.docs, name);
    }

    var local = utils.lookup('docs/**/*', name);
    var docs = _.union([], local, userDefined);

    // If `knownDocs` is defined, then the `./docs`
    // directory will not be loaded by default and
    // only the patterns specified in the options
    // will be used
    if(opts.knownDocs) {
      docs = userDefined;
    }

    var src = docs.map(function(filepath) {

      // Parse front matter in the doc
      var doc = matter.read(filepath);

      var context = _.extend(_.cloneDeep(verb.context, opts), doc.context);
      return verb.template(doc.content, context);
    }).join(opts.sep);

    return utils.adjust.headings(src);
  };

  return exports;
};

