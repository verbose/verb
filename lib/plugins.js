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
 * Plugins
 *
 * Adds `plugin` extensions to the context.
 *
 * @name plugins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

module.exports = function (verb) {
  var builtins = path.join(__dirname, 'plugins/*.js');
  extension('plugins', builtins, verb);
};