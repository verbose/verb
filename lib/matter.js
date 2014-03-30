/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const matter = require('gray-matter');
const _ = require('lodash');


/**
 * Parse and extract YAML, JSON or Coffee
 * front matter.
 *
 * @return {Object}
 * @api public
 */

module.exports = function(src, options) {
  options = options || {};

  var defaults = {lang: 'yaml'};
  var opts = _.extend(defaults, options.matter || {});
  return matter(src, opts);
};
