/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
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

exports.init = function (phaser) {
  var opts = _.extend({}, phaser.options);
  var extendContext = phaser.utils.extendContext;

  var filters = {};
  var builtIns = path.join(__dirname, 'filters/*.js');

  /**
   * Built-in filters
   */

  _.extend(filters, extendContext(phaser, builtIns));

  /**
   * User-defined
   */

  _.extend(filters, extendContext(phaser, opts.filters));

  phaser.verbose.info(filters);
  phaser.verbose.info(_.keys(filters).length + ' filters registered.', colors.green('OK.'));
  phaser.context = _.extend({}, phaser.context, filters);
};