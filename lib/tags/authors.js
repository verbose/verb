/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

module.exports = function (verb) {
  verb.options = verb.options || {};

  exports.authors = verb.options.authors || verb.utils.authors() || [];

  return exports;
};