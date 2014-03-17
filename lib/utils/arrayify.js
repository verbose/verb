/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
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