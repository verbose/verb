/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(phaser) {

  exports.date = function(structure) {
    return phaser.utils.date(new Date(), structure);
  };

  return exports;
};