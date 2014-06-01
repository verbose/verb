/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const file = require('fs-utils');
const path = require('path');
const relative = require('relative');
const scrawl = require('scrawl');
const stripBanner = require('strip-banner');
const _ = require('lodash');

const tmpl = 'test/fixtures/comment.tmpl.md';

function lineCount(content) {
  if (_.isEmpty(content)) {
    return 0;
  }
  // Normalize newlines
  content = file.normalizeNL(content);
  // Split on each newline
  return content.split('\n').length;
}

module.exports = function(verb) {
  var verbOpts = verb.options;
  var condense = verb.utils.condense;
  var format = verb.utils.md.format;
  var tags = {};


  tags.comments = function(src, options) {
    var opts = _.extend({}, verbOpts, options);
    var page = {};

    file.expand(src).map(function(filepath) {
      filepath = path.resolve(filepath);
      var name = file.filename(filepath);
      var dest = opts.dest || verb.cwd();
      var relpath = relative(dest, filepath);

      // Read file
      var content = file.readFileSync(filepath, opts);
      var origLen = lineCount(content);

      // Strip banners so they don't end up in docs
      content = stripBanner(content);
      var stripLen = lineCount(content);
      var offset = origLen - stripLen;


      page[name] = {};
      page[name].name = name;
      page[name].path = file.normalizeSlash(relpath);
      page[name].comments = [];

      var comments = scrawl.parse(content);
      page[name].comments.push(comments.map(function (comment) {
        comment.line = comment.line + offset;
        return comment;
      }));

    });

    if (opts.debug) {
      file.writeJSONSync('tmp/matches.json', page);
    }

    var result = verb.read(tmpl, {files: page});
    return format(condense(result));
  };

  return tags;
};