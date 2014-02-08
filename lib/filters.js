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
var _ = require('lodash');

// Local libs
var utils = require('./utils');
var expand = utils.expand;
var arrayify = utils.arrayify;


exports.init = function (config, options, params) {
  var opts = _.extend({}, options);
  var cwd = path.join(__dirname, '../');

  function extendFilters(patterns) {
    _.mixin(require(patterns)(config, options, params));
  }

  expand(['lib/functions/*.js'], {cwd: cwd}).map(function(filepath) {
    extendFilters(filepath);
  });

  if(opts.filters) {
    if (_.isObject(opts.filters)) {
      _.mixin(opts.filters);
    } else {
      opts.filters = arrayify(opts.filters);
      try {
        expand(opts.filters).map(function(filepath) {
          extendFilters(filepath);
        });
      } catch (e) {
        e.origin = __filename;
        console.warn('No filters found: (error code "' + e.code + '").', e.stack);
      }
    }
  }
  return;
};
