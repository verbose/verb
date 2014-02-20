/**
 * grunt-readme
 * Copyright (c) 2014, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Custom mixins
module.exports = function(options) {
  options = options || {};
  options.customProp = options.customProp || '';

  exports.customMixin = function(src) {
    return src + ' worked!';
  };

  exports.customProp = function() {
    return options.customProp;
  };

  exports.concat = function(a, b) {
    return a + b;
  };

  exports.lowercase = function(src) {
    return src.toLowerCase();
  };

  return exports;
};