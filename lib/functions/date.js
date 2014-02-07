/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Local libs
var utils = require('../utils');

// Custom mixins
module.exports = function(config, options) {
  options = options || {};

  exports.date = function(format) {
    return utils.date(new Date(), format);
  };

  return exports;
};