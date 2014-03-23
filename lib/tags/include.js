/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var matter = require('gray-matter');
var find = require('find');
var _ = require('lodash');
var includes = require('verb-readme-includes');

module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;

  exports.include = function (name, options) {
    var opts = _.extend({ext: '.md'}, options, verbOpts);
    var search = path.normalize(name + opts.ext);
    var matches = [], msg;

    if (opts.includes) {
      matches = utils.resolveMatches(search, opts.includes);
    }

    if (!matches.length) {
      matches = utils.resolveMatches(search, includes);
    }

    // Check again after running search against 'verb-readme-includes'.
    if (search.length && !matches.length) {
      msg = ' [nomatch] · verb could not find a match for {%= include("' + name + '") %}';
      verb.log.warn('  ' + verb.runner.name + msg);
    }

    if (matches.length > 1) {
      msg = [' [matches] · verb found more than one matching document for',
        '                       {%= include("' + name + '") %}'].join('\n');
      verb.log.warn('  ' + verb.runner.name + msg);
    }

    var page = matter.read(String(matches[0]));

    // Extend context with metadata from front matter.
    var context = _.extend(_.cloneDeep(verb.context, opts), page.context);
    var result = verb.template(page.content, context);
    return utils.adjust.headings(result);
  };

  return exports;
};

