/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const _ = require('lodash');

/**
 * Default exclusions
 */

var exclusions = [
  'bin',
  'cache',
  'contributing',
  'filters',
  'functions',
  'lang',
  'matter',
  'namespace',
  'tags',
  'verbose'
];

/**
 * Omit properties from the context
 *
 * @return {Object}
 * @api private
 */

module.exports = function(context, options) {
  var opts = _.extend({omit: []}, options);
  var omit = _.defaults(opts.omit, exclusions);
  return _.omit(context, omit);
};