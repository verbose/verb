/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const file = require('fs-utils');
const _ = require('lodash');
const includes = require('verb-readme-includes');

module.exports = function (verb) {
  verb.options = verb.options || {};
  var utils = verb.utils;

  exports.include = function (name, options) {
    options = _.extend({ext: verb.ext}, options || {});

    // Extend the context with options defined in the tag
    _.extend(verb.context, options);
    _.extend(verb.options, options);

    var ext = verb.options.ext,
      search = path.normalize(!file.hasExt(name) ? (name + ext) : name),
      matches = [], msg;

    if (options.includes) {
      matches = utils.resolveMatches(search, options.includes);
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

    // Our "array" should only have one file at this point.
    var content = file.readFileSync(String(matches[0]));
    var page = verb.matter(utils.delims.escape(content));

    if (options.raw) {
      return page.content;
    }

    // Extend context with metadata from front matter.
    var context = _.extend(_.cloneDeep(verb.context, options), page.data);
    var result = verb.template(page.content, context);
    return utils.adjust.headings(result);
  };

  return exports;
};

