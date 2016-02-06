'use strict';

module.exports = function(verb) {
  verb.task('<%= alias %>', function(cb) {
    console.log('verb generator > default task');
    cb();
  });

  verb.task('default', ['<%= alias %>']);
};
