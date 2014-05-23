/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const matter = require('gray-matter');
const _ = require('lodash');


/**
 * Use gray-matter to parse and extract YAML, JSON, Coffee or TOML
 * front matter. Also set some defaults.
 *
 * @param   {String}  str      Source string to be parsed by gray-matter.
 * @param   {Object}  options  Options are passed to gray-matter on the `options.matter` property.
 * @return  {Object}           Returns an object from the parsed string: {orig: '', metadata: {}, content: ''}
 *
 * @api public
 */

module.exports = function(src, options) {
  options = options || {};
  var opts = _.extend({
    lang: 'yaml',
    autodetect: true
  }, options.matter || {});

  return matter(src, opts);
};
