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
var _ = require('lodash');
var includes = require('verb-readme-includes');

module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;

  exports.raw = function (name, options) {

    var opts = _.extend({
      ext: '.md',
      sep: '\n',
      glob: {
        filter: 'isFile',
        matchBase: true
      }
    }, options, verbOpts);

    var search = path.normalize(name + opts.ext);
    var matches = [];
    var msg;

    // Check includes for the file
    if (opts.includes) {
      matches = utils.resolveMatches(search, opts.includes);
    }

    // Check ./docs for the file
    if (opts.docs) {
      matches = _.union(matches, utils.resolveMatches(search, opts.docs));
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

    // Read the file without processing any templates
    return file.readFileSync(String(matches[0]));
  };

  return exports;
};

