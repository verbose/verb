/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const plasma = require('plasma');
const _ = require('lodash');

/**
 * Adds filters to the context
 *
 * @name filters
 * @param {Object} options
 * @return {Object}
 * @api private
 */

module.exports = function (verb) {
  var options = verb.options || {};
  options.filters = options.filters || [];
  var builtIns = path.join(__dirname, 'filters/*.js');

  _.extend(verb.context, plasma.fn(builtIns, {config: verb }));
  _.extend(verb.context, plasma.fn(options.filters, {config: verb }));
};