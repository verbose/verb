'use strict';

var relative = require('relative');

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

    console.log()
    console.log('- end -')
    console.log('---------------------------------------------------------------');
    console.log(relative(file.path));
    console.log()
    verb.diff(file.content, file.orig);
    next();
  };
};
