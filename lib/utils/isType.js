/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
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