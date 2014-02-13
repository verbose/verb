/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var base = require('cwd')();
var fs = require('fs-utils');
var _ = require('lodash');


/**
 * Export `phaser.file`
 */

var file = module.exports = {};

file.base = fs.normalizeSlash(base);

/**
 * Expand files.
 *
 * @name expand
 * @param {String} src
 * @param {Object} options
 *
 * @return {Array}
 * @api public
 */

file.expand = function (src, options) {
  var defaults = {sep: '\n', prefixBase: true, cwd: file.base, filter: 'isFile'};
  var opts = _.extend({}, defaults, options);
  opts.cwd = fs.normalizeSlash(opts.cwd) || '';
  return fs.expand(src, opts).map(fs.normalizeSlash);
};

/**
 * Expand files and read in content.
 *
 * @name expand
 * @param {String} src
 * @param {Object} options
 *
 * @return {Array}
 * @api public
 */

file.read = function (src, options) {
  return file.expand(src, options).map(function(filepath) {
    return fs.readFileSync(filepath);
  }).join(options.sep);
};


/**
 * Expand mapping
 *
 * @param  {name} expandMapping
 * @param  {Array|String} patterns Accepts either comma separated
 *         globbing patterns or an array of globbing patterns.
 * @param  {String} dest The base path for dest files.
 * @param  {Object} options Options to pass in:
 *     @option {String} cwd: the current working directory for source files.
 *     @option {String} ext: the file extension to use on dest files.
 *
 * @return {Array} Returns an array of src-dest file mappings.
 * @api public
 */

file.expandMapping = function(patterns, dest, options) {
  // Options defaults
  var opts = _.defaults({ext: '.md'}, options);

  // Globule defaults
  var globOpts = {
    flatten: true,
    matchBase: true,
    prefixBase: false,
    srcBase: file.base,
    destBase: dest,
    ext: opts.ext
  };

  return fs.expandMapping(patterns, globOpts);
};