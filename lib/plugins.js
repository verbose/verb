/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var cwd = require('cwd');
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var utils = require('./utils');
var log = require('./log');


/**
 * Register plugins with Phaser
 *
 * @name plugins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function(config, options, params) {
  var opts = _.extend({}, options);
  var phaser = params.phaser;
  var utils = phaser.utils;
  var plugins = {};

  function extendConfig(filepath) {
    return _.extend({}, plugins, require(filepath)(config, options, params));
  }

  phaser.verbose.warn("PLUGINS:", phaser.expand(['./lib/plugins/*.js']));

  phaser.expand(['./lib/plugins/*.js']).map(function(filepath) {
    plugins = extendConfig(filepath);
  });

  if(opts.plugins) {
    if (_.isObject(opts.plugins)) {
      plugins = _.extend({}, plugins, opts.plugins);
    } else {
      plugins = _.extend({}, plugins, utils.arrayify(opts.plugins));
      try {
        phaser.expand(opts.plugins).map(function(filepath) {
          plugins = extendConfig(filepath);
        });
      } catch (e) {
        e.origin = __filename;
        phaser.verbose.warn('No plugins found: (error code "' + e.code + '").', e.stack);
      }
    }
  }
  params.context = _.extend({}, params.context, plugins);
  return params.context;
};