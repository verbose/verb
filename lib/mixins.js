/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var path = require('path');

// node_modules
var base = require('cwd')();
var file = require('fs-utils');
var _ = require('lodash');

/**
 * Adds mixins to the context
 *
 * @name mixins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (config, options, params) {
  var phaser = params.phaser;
  var opts = _.extend({cwd: phaser.base}, options);

  phaser.verbose.warn("MIXINS:", phaser.expand(['./lib/mixins/*.js']));

  phaser.expand(['./lib/mixins/*.js'], opts).map(function(filepath) {
    _.mixin(require(filepath)(config, options, params));
  });

  if(opts.mixins) {
    if (_.isObject(opts.mixins)) {
      _.mixin(opts.mixins);
    } else {
      opts.mixins = phaser.utils.arrayify(opts.mixins);
      try {
        phaser.expand(opts.mixins).map(function(filepath) {
          _.mixin(require(filepath)(config, options, params));
        });
      } catch (e) {
        e.origin = __filename;
        phaser.verbose.warn('No mixins found: (error code "' + e.code + '").', e.stack);
      }
    }
  }
  return;
};
