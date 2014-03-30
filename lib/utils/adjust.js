/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const replace = require('frep');


/**
 * Adjust heading levels. Adds one heading level next
 * to all markdown headings to make them correct within
 * the scope of the inheriting document. Headings in
 * fenced code blocks are skipped.
 *
 * @return {String}
 * @api public
 */

var headings = [
  {
    pattern: /^#/gm,
    replacement: '##'
  },
  {
    pattern: /^\s*(`{3})\s*(\S+)?\s*([\s\S]+?)\s*(`{3})\s*(?:\n+|$)/gm,
    replacement: function (match) {
      return match.replace(/^##/gm, '#');
    }
  }
];

exports.headings = function(str) {
  return replace.strWithArr(str, headings);
};
