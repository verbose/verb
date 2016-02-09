'use strict';

module.exports = function verbDefault(verb) {
  verb.task('default', function(cb) {
    console.log('No tasks were defined, doing nothing.');
    cb();
  });
};
