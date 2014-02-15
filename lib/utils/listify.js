/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
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

module.exports = function (arr, sep) {
  sep = sep || ', ';

  do {
    arr = [].concat.apply([], arr);
  } while(arr.some(Array.isArray));
  return arr.join(sep);
};