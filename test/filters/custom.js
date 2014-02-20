/**
 * grunt-readme
 * Copyright (c) 2014, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');


// Custom mixins
module.exports = function(options, config) {
  options = options || {};
  options.customProp = options.customProp || '';
  config = _.extend({}, config);

  exports.grape = function(src) {
    return src + ' worked!';
  };

  exports.apple = function() {
    return options.customProp;
  };

  exports.carrot = function(a, b) {
    return a + b;
  };

  exports.potato = function(src) {
    return src.toLowerCase();
  };

  exports.lcns = function (opts) {
    opts = opts || {};
    opts.prepend = opts.prepend || "Released under the ";
    if(_.isObject(config.license)) {
      return opts.prepend + config.license.type + " license";
    }
    // else if(_.isString(config.license)) {
    //   return opts.prepend + config.license + " license";
    // }
    // else if(_.isArray(config.licenses)) {
    //   return opts.prepend + config.licenses[0].type + " license" + (config.licenses.length === 1 ? '' : 's');
    // }
  };
  return exports;
};