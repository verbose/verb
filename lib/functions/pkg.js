/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Custom mixins
module.exports = function(config, options) {
  options = options || {};

  exports.pkg = function(config) {
    return config;
  };

  return exports;
};