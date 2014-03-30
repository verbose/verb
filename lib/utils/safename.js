/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const _ = require('lodash');
const arrayify = require('./arrayify');


/**
 * Strings to strip from the return value.
 */

var prefixes = [
  'assemble',
  'assemble-contrib',
  'assemble-plugin',
  'filter',
  'generator',
  'grunt',
  'gulp',
  'handlebars-helper',
  'helper',
  'mixin',
  'plugin',
  'verb'
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
  var opts = options || {};

  if(opts.stripPrefix && opts.stripPrefix === false) {prefixes = [];}
  var exclusions = _.union(prefixes, arrayify(opts.omit || []));
  var re = new RegExp('^(?:' + exclusions.join('|') + ')[-_]?', 'g');
  return name.replace(re, '');
};