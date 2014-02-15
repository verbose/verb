/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var _ = require('lodash');

/**
 * Adds tags to the context
 *
 * @name tags
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (phaser) {
  var opts = _.extend({}, phaser.options);
  var extendContext = phaser.utils.extendContext;

  var tags = {};
  var builtIns = ['lib/tags/*.js'];

  /**
   * Built-in tags
   */

  _.extend(tags, extendContext(phaser, builtIns));

  /**
   * User-defined
   */

  _.extend(tags, extendContext(phaser, opts.tags));

  phaser.verbose.info(tags);
  phaser.verbose.info(_.keys(tags).length + ' tags registered.', chalk.green('OK.'));
  phaser.context = _.extend({}, phaser.context, tags);
};