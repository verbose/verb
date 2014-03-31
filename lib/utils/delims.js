/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const replace = require('frep');
const delims = module.exports = {};

/**
 * Escape / Unescape delimiters. Syntax was changed
 * to mirror Yeoman's, for familiarity to users.
 *
 * @return {String}
 * @api public
 */

var delimiters = {
  escape: [
    {
      pattern: /\{%%([^%]+)%}/g,
      replacement: '(;}%%{;)$1(;}%{;)'
    }
  ],
  unescape: [
    {
      pattern: /\(;}%%{;\)/g,
      replacement: '{%'
    },
    {
      pattern: /\(;}%{;\)/g,
      replacement: '%}'
    }
  ]
};

delims.escape = function(str) {
  return replace.strWithArr(str, delimiters.escape);
};

delims.unescape = function(str) {
  return replace.strWithArr(str, delimiters.unescape);
};
