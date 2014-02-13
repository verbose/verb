/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function() {

  exports.strip = function(str) {
    str = str.replace(/^\s+/gm, '');
    str = str.replace(/\s+$/gm, '');
    str = str.replace(/\n+/gm, ' ');
    return str;
  };
  return exports;
};