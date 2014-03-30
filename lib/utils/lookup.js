/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const file = require('fs-utils');
const _ = require('lodash');

var matches = function (name, files) {
  name = !file.hasExt(name) ? (name + '.md') : name;

  if (name.indexOf('*') !== -1) {
    name = String(file.expand(name));
  }

  return files.filter(function(filepath) {
    filepath = filepath.replace(/\\/g, '/');
    if (!!~filepath.search(name)) {
      return filepath;
    }
  });
};

/**
 *
 * Convenience wrapper around `glob.find` and `glob.match`.
 * Expand the given glob patterns, then look for a match
 * in the result set.
 *
 * @param   {String}  patterns  The glob patterns to expand.
 * @param   {String}  name      The name to match in the result set.
 * @return  {String}  Return matches.
 */

module.exports = function (patterns, name, opts) {
  var files = file.expand(patterns, _.extend({filter: 'isFile'}, opts));
  return matches(name, files);
};
