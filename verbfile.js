'use strict';

var through = require('through2');

module.exports = function(verb) {
  verb.extendWith('verb-readme-generator');

  verb.task('default', ['readme'], function() {
    return verb.src('README.md')
      .pipe(through.obj(function(file, enc, next) {
        file.content = file.content.replace(/^(#{2,}\s*\[)\./gm, '$1');
        next(null, file);
      }))
      .pipe(verb.dest('.'));
  });
};
