/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(phaser) {
  var utils = phaser.utils;

  exports.date = function(format) {
    return utils.date(new Date(), format);
  };

  return exports;
};