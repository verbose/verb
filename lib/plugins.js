/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

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
  var builtIns = ['lib/plugins/*.js'];

  /**
   * Built-in plugins
   */

  _.extend(plugins, extendContext(phaser, builtIns));

  /**
   * User-defined
   */

  _.extend(plugins, extendContext(phaser, opts.plugins));

  // phaser.verbose.info(plugins);
  // phaser.log.info(_.keys(plugins).length + ' plugins registered.', chalk.green('OK.'));
  phaser.context = _.extend({}, phaser.context, plugins);
};