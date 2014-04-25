/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const verb = require('../../');

/**
 * ## function time()
 * Get the current time using `.toLocaleTimeString()`.
 *
 * @return {String}
 * @api Public
 */

module.exports = function() {
  var time = new Date().toLocaleTimeString();
  return verb.log.bgBlack.white(time) + ' ';
};