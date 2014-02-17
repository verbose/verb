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
      filepath = path.resolve(filepath);
      var name = file.filename(filepath);
      var dest = opts.dest || phaser.cwd();
      var relpath = relative(dest, filepath);

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