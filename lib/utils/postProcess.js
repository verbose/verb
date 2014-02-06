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
var patterns = require('./patterns').escapeTemplates;

/**
 * Post-process content with RegExp replacement patterns
 * @param  {String} str     The string with patterns to replace.
 * @param  {Object} options The options to use
 *     [replacements] patterns to use
 * @return {String}         The transformed string.
 */
module.exports = function (str, options) {
  var opts = _.extend({}, options);
  var replacements = _.union([], patterns, opts.replacements);
  return frep.strWithArr(str, replacements);
};