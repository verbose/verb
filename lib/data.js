/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

var utils = require('./utils');

exports.init = function(options) {
  var opts = _.extend({contributing: true}, options);
  var data = utils.expandData(opts.data || {}, opts);

  var metadata = {};

  return _.extend({}, metadata, data);
};