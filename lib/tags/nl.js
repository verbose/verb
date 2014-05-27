/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const repeat = require('repeat-string');

module.exports = function () {
  var tags = {};

  tags.nl = function (num) {
    return repeat('\n', Number(num) || 1);
  };
  return tags;
};