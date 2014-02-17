/**
 * grunt-readme
 * Copyright (c) 2014, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

var _ = require('lodash');

'use strict';

// Custom mixins
module.exports = function(options, config) {
  options = options || {};
  options.customProp = options.customProp || '';
  var config = _.extend({}, config);

  exports.customMixin = function(src, opts) {
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