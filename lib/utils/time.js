/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');

/**
 * ## function time()
 * Get the current time using `.toLocaleTimeString()`.
 *
 * @return {String}
 * @api Public
 */

module.exports = function() {
  var time = new Date().toLocaleTimeString();
  return chalk.bgBlack.white(time) + ' ';
};