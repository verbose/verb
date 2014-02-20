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
 * Adds plugins to the context
 *
 * @name plugins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (phaser) {
  var opts = _.extend({}, phaser.options);
  var extendContext = phaser.utils.extendContext;

  var plugins = {};
  var builtIns = path.join(__dirname, 'plugins/*.js');

  /**
   * Run built-in plugins
   */
  extendContext(phaser, builtIns);

  /**
   * Run user-defined plugins
   */
  extendContext(phaser, opts.plugins);

  phaser.verbose.info(plugins);
  phaser.verbose.info(_.keys(plugins).length + ' plugins registered.', colors.green('OK.'));
};