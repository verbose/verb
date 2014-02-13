/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');


/**
 * Register plugins with Phaser
 *
 * @name plugins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var globOpts = {cwd: __dirname, prefixBase: false, nonull: true};
  var plugins = {};

  function extendConfig(filepath) {
    return _.extend({}, plugins, require(filepath)(phaser));
  }

  file.expand(['./plugins/*.js'], globOpts).map(function(filepath) {
    var name = path.resolve(__dirname, filepath);
    plugins = extendConfig(name);
  });

  if(phaserOpts.plugins) {
    if (_.isObject(phaserOpts.plugins)) {
      plugins = _.extend({}, plugins, phaserOpts.plugins);
    } else {
      plugins = _.extend({}, plugins, phaser.utils.arrayify(phaserOpts.plugins));
      try {
        file.expand(phaserOpts.plugins, {cwd: require('cwd')}).map(function(filepath) {
          plugins = extendConfig(filepath);
        });
      } catch (e) {
        e.origin = __filename;
        phaser.verbose.warn('No plugins found: (error code "' + e.code + '").', e.stack);
      }
    }
  }

  phaser.extensions = _.extend({}, phaser.extensions, plugins);
  phaser.verbose.warn("PLUGINS:", plugins);
};