/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var frep = require('frep');


/**
 * Adjust heading levels. Adds a heading
 * level for all headings, except those
 * in fenced code blocks.
 *
 * @return {String}
 * @api public
 */

var replacements = [
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

module.exports = function(str) {
  return frep.strWithArr(str, replacements);
};