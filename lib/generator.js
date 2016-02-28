'use strict';

module.exports = function verbDefault(verb) {
  verb.task('default', function(cb) {
    console.log('No tasks were defined, try running `verb readme` if verb-readme-generator is installed');
    cb();
  });
};
