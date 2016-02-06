'use strict';

var utils = require('../utils');

module.exports = function(verb) {
  verb.task('generator', function(cb) {
    verb.src('templates/generator.js', {cwd: __dirname})
      .pipe(verb.dest(function(file) {
        file.basename = verb.options.f || file.basename;
        return verb.cwd;
      }))
      .on('end', function() {
        console.log('created file');
        cb();
      });
  });

  verb.task('default', ['generator']);
};
