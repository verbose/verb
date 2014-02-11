/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var base = require('cwd')();
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var utils = require('./utils/index');
var log = require('./log');

/**
 * Adds filters to the context
 *
 * @name filters
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (config, options, params) {
  var opts = _.extend({cwd: base}, options);
  var phaser = params.phaser;
  var fn = {};
  phaser.log.mute = true;

  // phaser.verbose.warn("FILTERS:", utils.expand(['./lib/filters/*.js']));
  phaser.expand(['./lib/filters/*.js'], opts).map(function(filepath) {
    fn = _.extend({}, fn, require(filepath)(config, options, params));
  });

  if(opts.filters) {
    if (_.isPlainObject(opts.filters)) {
      fn = _.extend({}, fn, opts.filters);
    } else {
      fn = _.extend({}, fn, utils.arrayify(opts.filters));
      try {
        phaser.expand(opts.filters).map(function(filepath) {
          fn = _.extend({}, fn, require(filepath)(config, options, params));
        });
      } catch (e) {
        e.origin = __filename;
        phaser.verbose.warn('No filters found: (error code "' + e.code + '").', e);
      }
    }
  }

  params.context = _.extend({}, params.context, fn);
  return params.context;
};