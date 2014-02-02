/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var utils = require('../utils');

// Custom mixins
module.exports = function(config, options, params) {
  options = options || {};
  var page = params.page;

  exports.toc = function(src) {
    return utils.toc(src || page.content);
  };

  return exports;
};