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
  var fn = {};

  function extendConfig(filepath) {
    return _.extend({}, fn, require(filepath)(config, options, params));
  };

  expand(['lib/functions/*.js'], {cwd: cwd}).map(function(filepath) {
    fn = extendConfig(filepath);
  });

  if(opts.functions) {
    if (_.isObject(opts.functions)) {
      fn = _.extend({}, fn, opts.functions);
    } else {
      fn = _.extend({}, fn, utils.arrayify(opts.functions));
      try {
        expand(opts.functions).map(function(filepath) {
          fn = extendConfig(filepath);
        });
      } catch (e) {
        e.origin = __filename;
        console.warn('No custom functions found: (error code "' + e.code + '").', e.stack);
      }
    }
  }
  return fn;
};