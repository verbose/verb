/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var arrayify = require('./arrayify');


/**
 * Strings to strip from the return value.
 */

var strip = [
  'assemble',
  'assemble-contrib',
  'filter',
  'generator',
  'grunt',
  'gulp',
  'handlebars-helper',
  'helper',
  'mixin'
];

/**
 * Safename
 *
 * @param  {[type]} name The name to be modified
 * @return {[type]}      The "safe" short version of the name
 *
 * @example: "grunt-readme" => "readme"
 * @example: "helper-foo" => "foo"
 *
 * @api Public
 */

module.exports = function (name, options) {
  var opts = _.extend({}, options);

  if(opts.strip === false) {strip = [];}
  var exclusions = _.union(strip, arrayify(options.omit || []));
  var re = new RegExp('^(?:' + exclusions.join('|') + ')[-_]?', 'g');
  return name.replace(re, '');
};