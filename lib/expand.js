/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var base = require('cwd')();
var file = require('fs-utils');
var glob = require('globule');
var relative = require('relative');
var _ = require('lodash');


module.exports = function(config, options, params) {
  var phaser = params.phaser;

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

  var expand = module.exports = function (src, options) {
    var defaults = {sep: '\n', prefixBase: true, cwd: phaser.base, filter: 'isFile'};
    var opts = _.extend({}, defaults, options);
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

  expand.read = function (src, options) {
    return expand(src, options).map(function(filepath) {
      return file.readFileSync(filepath);
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

  expand.expandMapping = function(patterns, dest, options) {
    // Options defaults
    var opts = _.defaults({ext: '.md'}, options);

    // Globule defaults
    var globOpts = {
      flatten: true,
      matchBase: true,
      prefixBase: false,
      srcBase: file.normalizeSlash(relative(base, opts.cwd || base)),
      destBase: dest,
      ext: opts.ext
    };

    return file.expandMapping(patterns, globOpts);
  };

  return expand;
};
