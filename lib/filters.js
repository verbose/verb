/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const _ = require('lodash');

/**
 * Adds filters to the context
 *
 * @name filters
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (verb) {
  var options = verb.options || {};
  options.filters = options.filters || [];

  var extendContext = verb.utils.extendContext;
  verb.extensionType = 'filter';

  var filters = {};
  var builtIns = [__dirname, 'filters/*.js'].join('/');

  /**
   * Built-in filters
   */

  _.extend(filters, extendContext(verb, builtIns));

  /**
   * User-defined
   */

  _.extend(filters, extendContext(verb, options.filters));
  verb.context = _.extend({}, verb.context, filters);
};