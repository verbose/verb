/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var frep = require('frep');

var adjust = module.exports = {};


/**
 * Adjust heading levels. Adds one heading
 * level next to all markdown headings to
 * make them correct within the scope of the
 * inheriting document. Headings in fenced
 * code blocks are skipped.
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

adjust.headings = function(str) {
  return frep.strWithArr(str, headings);
};



/**
 * Unescapes delimiters
 *
 * @return {String}
 * @api public
 */

var delimiters = [
  {
    pattern: /\[\%/g,
    replacement: '{%'
  },
  {
    pattern: /\%\]/g,
    replacement: '%}'
  },
  {
    pattern: /\[\[!/g,
    replacement: '{{!'
  },
  {
    pattern: /\]\]/g,
    replacement: '}}'
  },
  {
    pattern: /<<!/g,
    replacement: '{{!'
  },
  {
    pattern: />>/g,
    replacement: '}}'
  }
];

adjust.delimiters = function(str) {
  return frep.strWithArr(str, delimiters);
};
