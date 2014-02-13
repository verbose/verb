/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

/**
 * Get the current time using `.toISOString()`
 * @name function timetamp()
 * @return {String}
 * @api Public
 */

module.exports = function () {
  return new Date().toISOString();
};