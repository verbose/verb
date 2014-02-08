/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var _ = require('lodash');

// Local libs
var utils = require('./utils');


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
  var plugins = {};

  function extendConfig(filepath) {
    return _.extend({}, plugins, require(filepath)(config, options, params));
  }

  utils.expand(['plugins/*.js'], {cwd: __dirname}).map(function(filepath) {
    plugins = extendConfig(filepath);
  });

  if(opts.plugins) {
    if (_.isObject(opts.plugins)) {
      plugins = _.extend({}, plugins, opts.plugins);
    } else {
      plugins = _.extend({}, plugins, utils.arrayify(opts.plugins));
      try {
        utils.expand(opts.plugins).map(function(filepath) {
          plugins = extendConfig(filepath);
        });
      } catch (e) {
        e.origin = __filename;
        console.warn('No plugins found: (error code "' + e.code + '").', e.stack);
      }
    }
  }
  params.context = _.extend({}, params.context, plugins);
  return params.context;
};