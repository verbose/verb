/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const replace = require('frep');
const _    = require('lodash');
const delims = require('./delims');

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
  options = _.extend({replacements: []}, options || {});
  var patterns = _.union([], replacements, options);

  str = replace.strWithArr(str, patterns);
  return delims.unescape(str);
};