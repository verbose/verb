/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var colors = require('../colors');

module.exports = function(verb) {

  // Expose logging to templates
  exports.log = verb.log;

  // Expose colors
  exports.bold    = colors.bold;
  exports.cyan    = colors.cyan;
  exports.green   = colors.green;
  exports.magenta = colors.magenta;
  exports.red     = colors.red;
  exports.yellow  = colors.yellow;

  return exports;
};