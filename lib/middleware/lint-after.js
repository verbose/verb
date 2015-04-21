'use strict';

/**
 * Lints post-render content to find potential errors
 * or incorrect content.
 */

module.exports = function lintAfter_(verb) {
  var diff = verb.get('argv.diff');
  var lint = verb.get('argv.lint');

  return function (file, next) {
    if (!lint) return next();
    var str = file.content, error = {};

    if (/\[object Object\]/.test(str)) {
      // only show the last one or two path segments
      error.path = file.path.split(/[\\\/]/).slice(-2).join('/');
      error.message = '`[object Object]`';
      error.content = str;

      if (diff) {
        verb.diff(str, file.orig);
      }
      verb.union('messages.errors', error);
    }
    next();
  };
};
