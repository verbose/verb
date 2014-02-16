/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var relative = require('relative');
var _ = require('lodash');
var phaser = require('../');

/**
 * Export `phaser.file`
 */

var fs = module.exports;

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

fs.expand = function (src, options) {
  var defaults = {sep: '\n', prefixBase: true, cwd: phaser.cwd('docs'), filter: 'isFile'};
  var opts = _.extend({}, defaults, options);
  phaser.init(opts);
  opts.cwd = file.normalizeSlash(opts.cwd) || '';
  return file.expand(src, opts).map(file.normalizeSlash);
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

fs.read = function (src, options) {
  var defaults = {sep: '\n', prefixBase: true, cwd: phaser.cwd('docs'), filter: 'isFile'};
  var opts = _.extend(defaults, options);
  phaser.init(opts);

  return fs.expand(src, opts).map(function(filepath) {
    phaser.log.success('Reading', relative(phaser.cwd(), filepath));
    return file.readFileSync(filepath);
  }).join(opts.sep);
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

fs.expandMapping = function(patterns, dest, options) {
  // Options defaults
  var opts = _.defaults({ext: '.md'}, options);

  // Globule defaults
  var globOpts = {
    flatten: true,
    matchBase: true,
    prefixBase: false,
    srcBase: cwd,
    destBase: dest,
    ext: opts.ext
  };

  return file.expandMapping(patterns, globOpts);
};