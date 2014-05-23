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

module.exports = function (verb) {
  verb.options = verb.options || {};
  var utils = verb.utils;
  var tags = {};

  tags.docs = function (name, options) {
    var defaults = {ext: verb.ext, docs: verb.docs};
    options = _.extend(defaults, options || {});

    // Extend the context with options defined in the tag
    _.extend(verb.context, options);
    _.extend(verb.options, options);

    var ext = verb.options.ext,
      search = path.normalize(!file.hasExt(name) ? (name + ext) : name),
      matches = [],
      msg;

    matches = utils.resolveMatches(search, verb.options.docs);

    // If a filename was given, but no results are returned, kindly notify the user.
    if (search.length && !matches.length) {
      msg = ' [nomatch] · verb could not find a match for {%= docs("' + name + '") %}';
      verb.log.warn('  ' + verb.runner.name + msg);
      return;
    }

    // If more than one match is found for a file
    if (matches.length > 1) {
      msg = [' [matches] · verb found more than one matching document for',
        '                       {%= docs("' + name + '") %}'].join('\n');
      verb.log.error('  ' + verb.runner.name + msg);
      return;
    }

    // Our "array" should only have one file at this point.
    var content = file.readFileSync(String(matches[0]));
    var page = verb.matter(utils.delims.escape(content));

    if (verb.options.raw) {
      return page.content;
    }

    // Extend context with metadata from front matter.
    var context = _.extend(_.cloneDeep(verb.context), verb.options, page.data);
    var result = verb.template(page.content, context);
    return utils.adjust.headings(result);
  };

  return tags;
};

