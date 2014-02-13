/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var delims = require('delims');
var relative = require('relative');
var scrawl = require('scrawl');
var file = require('fs-utils');
var _ = require('lodash');


module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);

  exports.comments = function(src, options) {
    var opts = _.extend({}, phaserOpts, options);
    var page = {};

    file.expand(src).map(function(filepath) {
      var name = file.filename(filepath);
      var relpath = relative(opts.dest || process.cwd(), filepath);

      // Read file
      var content = file.readFileSync(filepath, opts);

      // Generate delimiters to parse comments
      var delimOpts = {flags: 'gm', body: ''};
      var delimiters = delims(['\\/\\*\\*', '\\*\\/'], delimOpts).evaluate;

      // Capture matching comments for each file
      var comments = content.match(delimiters) || [];

      page[name] = {};
      page[name].name = name;
      page[name].path = file.normalizeSlash(relpath);
      page[name].comments = [];

      comments.forEach(function(comment) {
        page[name].comments.push({
          // Use scrawl to parse comments
          comment: scrawl.parse(comment)
        });
      });

      // The first comment on each page should be a
      // banner. So let's remove it from the result.
      page[name].comments.shift();
    });

    var tmpl = 'test/fixtures/comment.tmpl.md';

    // For debugging
    file.writeJSONSync('test/actual/matches.json', page);
    return phaser.read(tmpl, {files: page});
  };

  return exports;
};