/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

module.exports = function(verb) {

  // Expose logging to templates
  exports.log     = verb.log;
  exports.bold    = verb.log.bold;
  exports.cyan    = verb.log.cyan;
  exports.green   = verb.log.green;
  exports.magenta = verb.log.magenta;
  exports.red     = verb.log.red;
  exports.yellow  = verb.log.yellow;

  return exports;
};