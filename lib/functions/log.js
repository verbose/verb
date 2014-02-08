/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(config, options) {
  options = options || {};

  exports.log = function(val) {
    return console.log(val);
  };

  return exports;
};