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
var file = require('fs-utils');
var _ = require('lodash');
var includes = require('verb-readme-includes');

module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;

  exports.include = function (name, options) {
    options = options || {};

    var opts = _.extend({ext: '.md'}, verbOpts, options);
    var search = path.normalize(!file.hasExt(name) ? (name + opts.ext) : name);
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

    if (opts.raw) {
      return file.readFileSync(String(matches[0]));
    }

    // Our "array" should only have one file at this point.
    var content = file.readFileSync(String(matches[0]));
    var page = verb.matter(content);

    // Extend context with metadata from front matter.
    var context = _.extend(_.cloneDeep(verb.context, opts), page.context);
    var result = verb.template(page.content, context);
    return utils.adjust.headings(result);
  };

  return exports;
};

