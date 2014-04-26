/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const template = require('template');
const _ = require('lodash');



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
  var opts = _.extend({}, {delims: ['{%', '%}']}, options || {});
  return template(str, data || {}, opts);
};