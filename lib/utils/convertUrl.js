/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const url = require('url');

module.exports = function(str) {
  var obj = url.parse(str);
  var ending = obj.path.replace(/\.git$/, '/');
  return 'https://' + obj.host + ending;
};