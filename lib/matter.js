/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var matter = require('gray-matter');
var _ = require('lodash');


/**
 * Parse and extract YAML, JSON or Coffee
 * front matter.
 *
 * @return {Object}
 * @api public
 */

exports.init = function(src, options) {
  var defaults = {autodetect: true};
  var opts = _.extend({}, defaults, options.matter);
  return matter(src, opts);
};