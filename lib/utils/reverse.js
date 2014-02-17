/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Reverse a string
 *
 * @name reverse
 * @param  {String} str The string to reverse
 * @return {String}     The reversed string.
 * @api public
 */

module.exports = function(str) {
  return str.split('').reverse().join('');
};