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
 * Adds filters to the context
 *
 * @name filters
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (phaser) {
  var opts = _.extend({}, phaser.options);
  var config = _.extend({}, phaser.config);
  var globOpts = {cwd: __dirname, prefixBase: false, nonull: true};
  var utils = phaser.utils;

  var filters = {};

  file.expand(['./filters/*.js'], globOpts).map(function(filepath) {
    var name = path.resolve(__dirname, filepath);
    filters = _.extend({}, filters, require(name)(phaser));
  });

  if(opts.filters) {
    if (_.isPlainObject(opts.filters)) {
      filters = _.extend({}, filters, opts.filters);
    } else {
      filters = _.extend({}, filters, utils.arrayify(opts.filters));
      try {
        file.expand(opts.filters, {cwd: require('cwd')}).map(function(filepath) {
          filters = _.extend({}, filters, require(filepath)(phaser));
        });
      } catch (e) {
        e.origin = __filename;
        phaser.verbose.warn('No filters found: (error code "' + e.code + '").', e);
      }
    }
  }

  phaser.verbose.info("FILTERS:", filters);
  phaser.context = _.extend({}, phaser.context, filters);
  // return phaser.context;
};