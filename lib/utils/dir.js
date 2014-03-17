/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var cwd = require('cwd');
var file = require('fs-utils');
var relative = require('relative');


/**
 * Get the relative path from process.cwd() to
 * the specifiied paths, from any other directory
 * in the project.
 *
 * @return {String}
 * @api public
 */

module.exports = function() {
  var filepath = path.join.apply(path, arguments);
  filepath = relative(cwd, filepath);
  return file.normalizeSlash(filepath);
};