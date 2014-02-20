/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var colors = require('../colors');

module.exports = function(phaser) {

  // Expose logging to templates
  exports.log = phaser.log;

  // Expose colors
  exports.bold    = colors.bold;
  exports.cyan    = colors.cyan;
  exports.green   = colors.green;
  exports.magenta = colors.magenta;
  exports.red     = colors.red;
  exports.yellow  = colors.yellow;

  return exports;
};