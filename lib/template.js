/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var template = require('template');
var _ = require('lodash');

module.exports = function(src, data, settings) {
  var defaults = {delims: ['{%', '%}'], variable: ''};
  settings = _.defaults({}, settings, defaults);
  data = _.extend({}, data);
  return template(src, data, settings);
};