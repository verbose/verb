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
var _ = require('lodash');
var includes = require('verb-readme-includes');


module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;
  var page = {}, filepath;

  exports.include = function (patterns, options) {

    if (typeof patterns === 'undefined') {
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

    var userIncludes = file.expand(opts.includes).map(utils.resolve);
    var local = utils.matchName(userIncludes, patterns);
    var npm = utils.matchName(includes, patterns);

    // Parse front matter in the include
    if (local && local.length > 0) {
      filepath = String(local[0]);
      page = matter.read(filepath);
    } else if (npm && npm.length > 0) {
      filepath = String(npm[0]);
      page = matter.read(filepath);
    }

    // Extend context with metadata from front matter.
    var context = _.extend(_.cloneDeep(verb.context, opts), page.context);
    return verb.template(page.content, context);
  };

  return exports;
};

