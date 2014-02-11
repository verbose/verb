/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var utils = require('../utils');

module.exports = function(config, options) {
  options = options || {};

  exports.reverse = function(str) {
    return utils.reverse(str);
  };

  return exports;
};