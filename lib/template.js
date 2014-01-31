/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var template = require('template');
var _ = require('lodash');

module.exports = function(src, options) {
  var defaults = {delims: ['{%', '%}'], namespace: ''};
  var settings = _.extend(defaults, options);
  return template(src, options, settings);
};