/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

var file = require('fs-utils');
var relative = require('relative');
var _ = require('lodash');

// Phaser
var phaser = require('../');


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

exports.expand = function (src, options) {
  var opts = _.defaults({}, options, {
    sep: '\n',
    prefixBase: true,
    cwd: phaser.cwd('docs'),
    filter: 'isFile'
  });
  phaser.init(opts);

  opts.cwd = file.normalizeSlash(opts.cwd) || '';
  return file.expand(src, opts).map(file.normalizeSlash);
};

/**
 * Read files.
 *
 * @name read
 * @param {String} src
 * @param {Object} options
 *
 * @return {Array}
 * @api public
 */

exports.read = function (src, options) {
  var opts = _.defaults({}, options, {
    sep: '\n',
    prefixBase: true,
    cwd: phaser.cwd('docs'),
    filter: 'isFile'
  });
  phaser.init(opts);

  opts.cwd = file.normalizeSlash(opts.cwd) || '';
  return file.expand(src, opts).map(function (filepath) {
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

exports.expandMapping = function (patterns, dest, options) {
  var opts = _.defaults({}, options, {
    ext: '.md'
  });
  phaser.init(opts);

  opts.cwd = phaser.cwd(opts.cwd || 'docs');

  // Globule defaults
  var globOpts = {
    flatten: true,
    matchBase: true,
    prefixBase: false,
    srcBase: opts.cwd,
    destBase: dest,
    ext: opts.ext
  };

  return file.expandMapping(patterns, globOpts);
};