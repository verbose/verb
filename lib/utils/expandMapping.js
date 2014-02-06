/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var glob = require('globule');
var _ = require('lodash');


/**
 * Expand mapping
 *
 * @name expandMapping
 * @param  {Array|String} patterns  Accepts either comma separated
 *                                  globbing patterns or an array of globbing patterns.
 * @param  {String} dest            The base path for dest files.
 * @param  {Object} options         Options to pass in:
 *     @option {String} cwd: the current working directory for source files.
 *     @option {String} ext: the file extension to use on dest files.
 *
 * @return {Array}                  Returns an array of src-dest file mappings.
 *
 * @api {Public}
 */

module.exports = function(patterns, dest, options) {
  // Options defaults
  var opts = _.defaults({cwd: 'docs', ext: '.md'}, options);

  // Globule defaults
  var globOpts = {
    flatten: true,
    matchBase: true,
    prefixBase: false,
    srcBase: opts.cwd,
    destBase: dest,
    ext: opts.ext
  };

  return glob.findMapping(patterns, globOpts);
};