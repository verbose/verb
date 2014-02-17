/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var minimatch = require('minimatch');
var file = require('fs-utils');
var _ = require('lodash');
var templates = require('readme-templates');

module.exports = function (phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var utils = phaser.utils;

  exports.include = function (name, options) {
    var opts = _.extend({}, phaserOpts, options);

    // Load includes, local and defaults
    var localIncludes = file.expand(opts.includes || []);
    var includes = _.union([], localIncludes, templates('*').includes);

    var filepaths = _.filter(includes, function (filepath) {
      return file.basename(filepath) === name;
    });

    // if no matches, then try minimatch
    if (!filepaths || filepaths.length <= 0) {
      filepaths = includes.filter(minimatch.filter(name));
    }

    return filepaths.map(function (filepath) {
      var content = file.readFileSync(filepath, opts);
      return utils.adjust.headings(content);
    });
  };

  return exports;
};