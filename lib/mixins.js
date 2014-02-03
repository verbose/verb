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
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var utils = require('./utils');
var expand = utils.expand;


exports.init = function (config, options, params) {
  var opts = _.extend({}, options);
  var cwd = path.join(__dirname, '../');
  var mixins = [];

  function extendMixins(patterns) {
    _.mixin(require(patterns)(config, options, params));
  };

  expand(['lib/functions/*.js'], {cwd: cwd}).map(function(filepath) {
    extendMixins(filepath);
  });

  if(opts.mixins) {
    if (_.isObject(opts.mixins)) {
      _.mixin(opts.mixins);
    } else {
      opts.mixins = utils.arrayify(opts.mixins);
      try {
        expand(opts.mixins).map(function(filepath) {
          extendMixins(filepath);
        });
      } catch (e) {
        e.origin = __filename;
        console.warn('No mixins found: (error code "' + e.code + '").', e.stack);
      }
    }
  }
  return;
};