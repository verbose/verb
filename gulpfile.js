'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');
var unused = require('gulp-unused');

var lib = ['index.js', 'lib/**/*.js', 'bin/*.js'];

gulp.task('coverage', function() {
  return gulp.src(lib)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['coverage'], function() {
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports());
});

gulp.task('lint', function() {
  return gulp.src(['*.js', 'test/*.js'].concat(lib))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('unused', function() {
  return gulp.src(['index.js', 'lib/**/*.js', 'bin/*.js'])
    .pipe(unused({keys: Object.keys(require('./lib/utils.js'))}))
});

gulp.task('default', ['test', 'lint']);
