/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var path = require('path');
var relative = require('relative');
var scrawl = require('scrawl');
var stripBanner = require('strip-banner');
var _ = require('lodash');

var tmpl = 'test/fixtures/comment.tmpl.md';

function lineCount(content) {
  if (_.isEmpty(content)) {
    return 0;
  }
  // Normalize newlines
  content = file.normalizeNL(content);
  // Split on each newline
  return content.split('\n').length;
}

module.exports = function(phaser) {
  var phaserOpts = phaser.options;
  var condense = phaser.utils.condense;
  var format = phaser.utils.md.format;


  exports.comments = function(src, options) {
    var opts = _.extend({}, phaserOpts, options);
    var page = {};

    file.expand(src).map(function(filepath) {
      filepath = path.resolve(filepath);
      var name = file.filename(filepath);
      var dest = opts.dest || phaser.cwd();
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

    // For debugging
    file.writeJSONSync('test/actual/matches.json', page);

    var result = phaser.read(tmpl, {files: page});
    return format(condense(result));
  };

  return exports;
};