'use strict';

var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var verb = require('./');

verb.task('readme', function() {
  verb.src('.verb.md')
    .on('error', gutil.log)
    .pipe(verb.dest('.'));
});

verb.task('lint', function () {
  verb.src(['index.js', 'lib/**/*.js'])
    .on('error', gutil.log)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

verb.task('test', function (cb) {
  verb.src(['index.js', 'lib/**/*.js'])
    .on('error', gutil.log)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      verb.src('test/*.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', function () {
          verb.diff();
          console.log();
          cb();
        });
    });
});

// verb.task('default', ['lint', 'test', 'readme']);
verb.task('default', ['readme']);
