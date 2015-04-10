'use strict';

/**
 * Show a diff comparison of pre- and post-render content.
 */

module.exports = function diff_(verb) {
  var diff = false;
  verb.on('diff', function () {
    diff = true;
  });
  return function (file, next) {
    if (!diff) return next();
    verb.diff(file.content, file.orig);
    next();
  };
};
