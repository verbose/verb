/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const replace = require('frep');


// Markdown formatting
var patterns = [
  {
    // Newlines
    pattern: /[\r\n?|\n]+/gm,
    replacement: '\n'
  },
  {
    // Not-lists
    pattern: /^([^\*]+)$/gm,
    replacement: '\n$1\n'
  },
  {
    // Headings
    pattern: /^((#{1,6})\s*(.*?)\s*#*\s*(?:\n|$))/gm,
    replacement: '\n$1\n'
  },
  {
    // Headings
    pattern: /^\s+(#.+)/gm,
    replacement: '\n$1'
  },
  {
    pattern: /^\s+/,
    replacement: ''
  }
];


/**
 * Format markdown, adjusts whitespace.
 *
 * @title format
 * @param   {String}  str
 * @return  {String}       [description]
 */

exports.format = function(str) {
  return replace.strWithArr(str, patterns);
};
