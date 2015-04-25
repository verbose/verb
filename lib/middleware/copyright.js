'use strict';

var fs = require('fs');
var update = require('update-copyright');
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
  var copyright = verb.get('data.copyright');
  var readme = verb.files('README.md');
  var parsed = false;

  if (!parsed && !copyright && readme.length) {
    var str = fs.readFileSync(readme[0], 'utf8');
    var res = update(str);
    if (res) {
      parsed = true;
      verb.set('data.copyright.statement', res);
    }
  }

  return function (file, next) {
    if (typeof copyright === 'string') return next();
    if (typeof copyright === 'object' && Object.keys(copyright).length) {
      return next();
    }
    copyright = verb.get('data.copyright') || parse(file.content)[0] || {};
    verb.set('data.copyright', copyright);
    file.data.copyright = copyright;
    next();
  };
};
