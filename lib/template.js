/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var template = require('template');
var _ = require('lodash');



/**
 * Compile Lo-Dash templates.
 *
 * @param  {String} str      The templates to process.
 * @param  {Object} data     Context for the templates
 * @param  {Object} settings Options to pass to Lo-Dash
 * @return {String}
 *
 * @api public
 */

module.exports = function(str, data, settings) {
  var defaults = {delims: ['{%', '%}'], variable: ''};
  settings = _.defaults({}, settings, defaults);
  return template(str, data || {}, settings);
};