/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * isJavaScript
 */

module.exports = function(src) {
  return src.match(/.+\.js/g);
};