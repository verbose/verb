'use strict';

var extract = require('gfm-code-blocks');

/**
 * Detect the layout to use
 */

module.exports = function(app) {

  return function(view, next) {
    var examples = {};

    var str = view.content;
    extract(str).forEach(function(block) {
      block.orig = block.block;
      var m = /^\/\/\s*example(\.[^\n]+)([\s\S]+)/.exec(block.code);
      if (!m) return next();
      var name = m[1];
      examples[name] = examples[name] || [];
      view.content = view.content.split(block.block).join('');
      block.block = '```js\n' + m[2] + '\n```\n';
      examples[name].push(block);
    });

    app.set('cache.data.examples', examples);
    next();
  };
};
