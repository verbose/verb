/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
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

module.exports = function(str, data, options) {
  var defaults = {delims: ['{%', '%}'], variable: ''};
  var opts = _.extend({}, defaults, options);
  return template(str, data || {}, opts);
};
