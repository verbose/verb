'use strict';

var parse = require('parse-copyright');

/**
 * Add copyright information to the context.
 *
 * ```js
 * // get
 * console.log(verb.get('data.copyright'));
 * // or directly
 * console.log(verb.cache.data.copyright);
 * // used by the copyright helper
 * {%= copyright() %}
 * ```
 */

module.exports = function copyright_(verb) {
  return function (file, next) {
    if (!verb.get('data.copyright') && file.path.indexOf('index.js') !== -1) {
      var copyright = parse(file.content);
      verb.data({copyright: copyright[0]});
      file.data.copyright = copyright[0];
    }
    next();
  };
};
