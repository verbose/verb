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
var blacklist = ['grunt', 'helper', 'handlebars-helper', 'mixin', 'filter', 'assemble-contrib', 'assemble'];

module.exports = function (name, options) {
  var opts = _.extend({}, options);

  if(opts.blacklist === false) {blacklist = [];}
  var exclusions = _.union(blacklist, arrayify(options.omit || []));
  var re = new RegExp('^(?:' + exclusions.join('|') + ')[-_]?', 'g');
  return name.replace(re, '');
};