/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';


/**
 * Coerce the value to an array
 *
 * @param {name} arrayify
 * @param {Array|String} arr
 *
 * @return {Array}
 * @api public
 */

module.exports = function(arr) {
  return !Array.isArray(arr) ? [arr] : arr;
};