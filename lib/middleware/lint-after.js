'use strict';

var extend = require('extend-shallow');

/**
 * Lints post-render content to find potential errors
 * or incorrect content.
 */

module.exports = function(app) {
  var config = extend({}, app.options, app.get('argv'));
  var diff = config.diff;
  var lint = config.lint;

  return function (file, next) {
    if (!lint) return next();
    var str = file.content, error = {};

    if (/\[object Object\]/.test(str)) {
      // only show the last one or two path segments
      error.path = file.path.split(/[\\\/]/).slice(-2).join('/');
      error.message = '`[object Object]`';
      error.content = str;

      if (diff) {
        app.diff(str, file.orig);
      }
      app.union('messages.errors', error);
    }
    next();
  };
};
