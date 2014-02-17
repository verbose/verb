/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

/**
 * Remove all extraneous newlines.
 *
 * @title compact
 * @param  {String} str
 *
 * @return {String}
 * @api public
 */

module.exports = function (str, sep) {
  sep = sep || '\n';
  str = (str || '\n\n').replace(/[\r\n?|\n]+/gm, '\n');
  return _.compact(str.split(sep).map(function(line) {
    return line.trim();
  })).join(sep);
};