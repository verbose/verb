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

  _.extend(verb.context, plasma.load(builtIns, {
    config: verb
  }).modules.resolved);

  _.extend(verb.context, plasma.load(options.filters, {
    config: verb
  }).modules.resolved);
};