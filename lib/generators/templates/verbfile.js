'use strict';

module.exports = function(verb) {
  verb.doc('.verb.md');

  verb.task('default', function(cb) {
    console.log('verbfile > default task');
    cb();
  });
};
