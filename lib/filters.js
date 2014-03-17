/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var colors = require('./colors');
var _ = require('lodash');

/**
 * Adds filters to the context
 *
 * @name filters
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (verb) {
  var opts = _.extend({}, verb.options);
  var extendContext = verb.utils.extendContext;

  var filters = {};
  var builtIns = path.join(__dirname, 'filters/*.js');

  /**
   * Built-in filters
   */

  _.extend(filters, extendContext(verb, builtIns));

  /**
   * User-defined
   */

  _.extend(filters, extendContext(verb, opts.filters));

  verb.verbose.info(filters);
  verb.verbose.info(_.keys(filters).length + ' filters registered.', colors.green('OK.'));
  verb.context = _.extend({}, verb.context, filters);
};