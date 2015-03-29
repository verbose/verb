'use strict';

/**
 * Lints post-render content to find potential errors
 * or incorrect content.
 */

module.exports = function lintAfter_(verb) {
  verb.cache.errors = verb.cache.errors || [];
  var lint = false;

  verb.on('lint', function () {
    lint = true;
  });

  return function (file, next) {
    if (!lint) return next();
    var str = file.content, error = {};
    if (/\[object Object\]/.test(str)) {
      error.message = '[object Object] detected';
      error.path = file.path;
      error.content = file.content;
      verb.diff(file.content, file.orig);
      verb.union('errors', error);
    }
    next();
  };
};
