/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

exports.init = function(config, options) {
  var opts = _.extend({contributing: true}, options);
  var metadata = {};

  return _.extend(config, metadata);
};