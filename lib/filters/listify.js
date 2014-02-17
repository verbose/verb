/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Flatten an array and convert it
 * to a comma-separated list.
 *
 * @title listify
 * @param {Array} arr [description]
 * @api Public
 */

module.exports = function (phaser) {
  exports.listify = function(arr, sep) {
    return phaser.utils.listify(arr, sep);
  };
  return exports;
};

