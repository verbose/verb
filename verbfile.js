'use strict';

var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var through = require('through2');
var verb = require('./');

verb.disable('debugEngine');
verb.disable('reflinks');

verb.task('readme', function () {
  verb.src('.verb.md')
    .pipe(verb.dest('.'))
});

verb.task('docs', function () {
  verb.src('docs/_templates/[e-g]*.md')
    .pipe(verb.dest('test/actual'))
});

verb.task('lint', function () {
  /* deps: jshint-stylish */
  verb.src(['index.js', 'lib/**/*.js'])
    .on('error', gutil.log)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

verb.task('test', ['lint'], function (cb) {
  verb.src(['index.js', 'lib/**/*.js'])
    .on('error', gutil.log)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      verb.src('test/*.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          reporters: [ 'text' ],
          reportOpts: {dir: 'coverage', file: 'summary.txt'}
        }))
        .on('end', function () {
          verb.diff();
          cb();
        });
    });
});

verb.task('default', ['readme']);
