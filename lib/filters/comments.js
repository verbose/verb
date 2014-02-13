/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var relative = require('relative');
var scrawl = require('scrawl');
var file = require('fs-utils');
var strip = require('strip-banner');
var _ = require('lodash');

var tmpl = 'test/fixtures/comment.tmpl.md';


module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var condense = phaser.utils.condense;
  var format = phaser.utils.md.format;


  exports.comments = function(src, options) {
    var opts = _.extend({}, phaserOpts, options);
    var page = {};

    file.expand(src).map(function(filepath) {
      var name = file.filename(filepath);
      var relpath = relative(opts.dest || phaser.base, filepath);

      // Read file
      var content = file.readFileSync(filepath, opts);

      // Strip banners so they don't end up in docs
      content = strip(content);

      page[name] = {};
      page[name].name = name;
      page[name].path = file.normalizeSlash(relpath);
      page[name].comments = [];
      page[name].comments.push(scrawl.parse(content));
    });

    // For debugging
    file.writeJSONSync('test/actual/matches.json', page);
    var result = phaser.read(tmpl, {files: page});
    return format(condense(result));
  };

  return exports;
};