/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function (phaser) {
  var opts = _.extend({}, phaser.options);
  exports.authors = opts.authors || phaser.utils.authors() || [];
  return exports;
};