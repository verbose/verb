/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Returns the `typeOf` a JavaScript value
 *
 * @return {String}
 * @api public
 */

module.exports = function(obj) {
  var re = /\s([a-zA-Z]+)/;
  return Object.prototype.toString.call(obj).match(re)[1].toLowerCase();
};