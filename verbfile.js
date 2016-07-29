'use strict';

var through = require('through2');
var reflinks = require('gulp-reflinks');
var format = require('gulp-format-md');
var utils = require('./lib/utils');

module.exports = function(app) {
  app.use(require('verb-generate-readme'));

  app.task('docs', ['setup'], function(cb) {
    app.layouts('docs/src/templates/layouts/*.md');
    return app.src('docs/src/*.md', {layout: 'default'})
      .pipe(app.renderFile('*'))
      .pipe(reflinks())
      .pipe(format())
      .pipe(app.dest('docs'))
  });

  app.task('default', ['readme'], function() {
    return app.src('README.md')
      .pipe(through.obj(function(file, enc, next) {
        file.content = file.content.replace(/^(#{2,}\s*\[)\./gm, '$1');
        next(null, file);
      }))
      .pipe(format())
      .pipe(app.dest('.'));
  });
};
