/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var marked = require("marked");
var _      = require("lodash");

module.exports = function(str) {
  var heading    = '';
  var tokens = marked.lexer(str);

  function escapeRegex(re) {
    return re.replace(/(\[|\]|\(|\)|\/|\||\.|\^|\$|\*|\+|\?)/g, '\\$1');
  }

  tokens.filter(function (token) {
    // Filter out everything but headings
    if (token.type !== 'heading' || token.type === 'code') {
      return;
    } else {
      // Escape certain characters in headings, like '[', '('
      var h = escapeRegex(String(token.text));
      // Build up the regex to use for replacement patterns
      var re = new RegExp('^(#{1,6}?)\\s*(' + h + ')', 'gm');

      // Return source and re-write heading levels
      str = str.replace(re, function (match, $1, $2, offset, original) {
        return $1.replace(/^#/gm, '##') + ' ' + $2;
      });
    }
    return true;
  }).join('');
  return str;
};