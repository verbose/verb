/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var frep = require('frep');
var _    = require('lodash');

// Local libs
var adjust = require('./adjust');

/**
 * Post-process content with RegExp replacement patterns
 * @param  {String} str      The string with patterns to replace.
 * @param  {Object} options  The options to use
 *    @option {patterns} Replacement patterns to use
 *
 * @return {String}          The transformed string.
 * @api public
 */

var replacements = [
  {
    pattern: /^\s*/,
    replacement: ''
  },
  {
    pattern: /\s*\{{!(--)?.+(--)?}}/g,
    replacement: ''
  }
];

module.exports = function (str, options) {
  var opts = _.extend({}, options);
  var patterns = _.union([], replacements, opts.replacements);

  str = frep.strWithArr(str, patterns);
  str = adjust.delimiters(str);
  return str;
};