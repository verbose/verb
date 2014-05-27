/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const extension = require('./utils/extension');

/**
 * Adds tags to the context
 *
 * @name tags
 * @param {Object} options
 * @return {Object}
 * @api private
 */

module.exports = function (verb) {
  var builtins = path.join(__dirname, 'tags/*.js');
  extension('tags', builtins, verb);
};