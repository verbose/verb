/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var glob = require('globule');
var _ = require('lodash');



/**
 * Expand files.
 *
 * @name expand
 * @param {String} src
 * @param {Object} options
 * @return {Array}
 *
 * @api public
 */

var expand = module.exports = function (src, options) {
  var opts = _.extend({sep: '\n', prefixBase: true, filter: 'isFile'}, options);
  opts.cwd = opts.cwd || process.cwd();
  return glob.find(src, opts);
};


/**
 * Expand files and read in content.
 *
 * @name expand
 * @param {String} src
 * @param {Object} options
 * @return {Array}
 *
 * @api public
 */

expand.read = function (src, options) {
  return expand(src, options).map(function(filepath) {
    return file.readFileSync(filepath);
  }).join(options.sep);
};