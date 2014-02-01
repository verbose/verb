

'use strict';

var marked = require("marked");
var _      = require("lodash");

module.exports = function(src) {
  var heading    = "";
  var tokens = marked.lexer(src);

  tokens.filter(function (token) {
    console.log(token);
    // console.log(token);
    // Filter out everything but headings
    if (token.type !== 'heading' || token.type === 'code') {
      return token;
    } else {
      return token.text.replace(/^#/gm, '##') || 'foo';
    }
  });
};