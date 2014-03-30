/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

module.exports = function() {
  exports.strip = function(str) {
    str = str.replace(/^\s+/gm, '');
    str = str.replace(/\s+$/gm, '');
    str = str.replace(/\n+/gm, ' ');
    return str;
  };
  return exports;
};