'use strict';

var extract = require('gfm-code-blocks');

/**
 * Detect the layout to use
 */

module.exports = function (app) {
  return function (file, next) {
    var examples = app.cache.data.examples || {};

    var str = file.content;
    extract(str).forEach(function (block) {
      block.orig = block.block;
      var m = /^\/\/\s*example\.([^\n]+)([\s\S]+)/.exec(block.code);
      if (!m) return next();
      if (!examples[m[1]]) {
        block.block = '```js\n' + m[2] + '\n```\n';
        examples[m[1]] = block;
      }
    });

    app.cache.data.examples = examples;

    for (var key in examples) {
      if (examples.hasOwnProperty(key)) {
        var block = examples[key]
        file.content = file.content.split(block.orig).join('');
      }
    }
    next();
  }
}
