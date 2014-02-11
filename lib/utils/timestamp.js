/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');

/**
 * ## function timetamp()
 * Get the current time using `.toISOString()`
 *
 * @return {String}
 * @api Public
 */

module.exports = function () {
  return new Date().toISOString();
};