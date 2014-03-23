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
var _ = require('lodash');

module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;

  exports.docs = function (name, options) {
    var opts = _.extend({ext: '.md', docs: verb.docs}, options, verbOpts);
    var search = path.normalize(name + opts.ext);
    var matches = [], msg;

    if (opts.docs) {
      matches = utils.resolveMatches(search, opts.docs);
    }

    // If a filename was given, but no results are returned, kindly notify the user.
    if (search.length && !matches.length) {
      msg = ' [nomatch] · verb could not find a match for {%= docs("' + name + '") %}';
      verb.log.warn('  ' + verb.runner.name + msg);
    }

    // If more than one match is found for a file
    if (matches.length > 1) {
      msg = [' [matches] · verb found more than one matching document for',
        '                       {%= docs("' + name + '") %}'].join('\n');
      verb.log.error('  ' + verb.runner.name + msg);
      process.exit(0);
    }

    // Our "array" should only have one file at this point.
    var page = matter.read(String(matches[0]));

    // Extend context with metadata from front matter.
    var context = _.extend(_.cloneDeep(verb.context, opts), page.context);
    var result = verb.template(page.content, context);
    return utils.adjust.headings(result);
  };

  return exports;
};

