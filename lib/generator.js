'use strict';

var wrap = require('word-wrap');

module.exports = function verbDefault(verb) {
  verb.task('default', function(cb) {
    verb.log('No tasks were defined, try running `verb readme` if verb-readme-generator is installed');
    cb();
  });
};
