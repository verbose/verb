/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(phaser) {

  exports.date = function(dateobj, structure) {
    dateobj = dateobj || new Date();
    return phaser.utils.date(dateobj, structure);
  };

  return exports;
};