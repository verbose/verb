'use strict';

var chalk = require('chalk');
var relative = require('relative');

/**
 * Show a diff comparison of pre- and post-render content.
 */

module.exports = function diff_(verb) {
  return function (file, next) {
    var diff = verb.get('argv.diff');

    if (!diff) return next();
    console.log();
    console.log('- end -');
    console.log('---------------------------------------------------------------');
    console.log(relative(file.path));
    console.log();

    if (file.content === '') {
      console.log(chalk.gray('  no content.'));
    } else if (file.content === file.orig) {
      console.log(chalk.gray('  content is unchanged.'));
    } else {
      verb.diff(file.orig, file.content, 'diffLines');
    }
    next();
  };
};
