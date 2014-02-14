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

var base = require('cwd')();
var relative = require('relative');
var cwd = file.normalizeSlash(relative(base, __dirname));


/**
 * Adds filters to the context
 *
 * @name filters
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (phaser) {
  var utils = phaser.utils;
  var opts = _.extend({}, phaser.options);

  var globOpts = {cwd: cwd, prefixBase: false, nonull: true};
  var filters = {};

  file.expand(['./filters/*.js'], globOpts).map(function(filepath) {
    var name = path.resolve(cwd, filepath);
    try {
      // Catch errors from empty files.
      filters = _.extend({}, filters, require(name)(phaser));
    } catch(e) {
      phaser.log.warn(e);
    }
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
};