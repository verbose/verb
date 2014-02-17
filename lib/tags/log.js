/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');

module.exports = function(phaser) {

  // Expose logging to templates
  exports.log = phaser.log;

  // Expose chalk colors
  exports.bold    = chalk.bold;
  exports.cyan    = chalk.cyan;
  exports.green   = chalk.green;
  exports.magenta = chalk.magenta;
  exports.red     = chalk.red;
  exports.yellow  = chalk.yellow;

  return exports;
};