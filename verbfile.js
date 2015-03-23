'use strict';

var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var through = require('through2');
var verb = require('./');

verb.disable('debugEngine');

// verb.data({travis: '', username: 'jonschlinkert'});
// verb.data({twitter: {username: 'jonschlinkert'}, github: {username: 'jonschlinkert'}});

verb.task('readme', function () {
  return verb.src('.verb.md')
    .on('error', gutil.log)
    .pipe(tmpl())
    .pipe(verb.dest('test/actual'))
    .on('error', gutil.log);
});

verb.task('docs', function () {
  return verb.src('docs/*.md')
    .on('error', gutil.log)
    .pipe(verb.dest('test/actual'))
    .on('error', gutil.log);
});

function tmpl(options) {
  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();
    file.contents = new Buffer(str);
    this.push(file);
    cb();
  });
}

// verb.task('lint', function () {
//   verb.src(['index.js', 'lib/**/*.js'])
//     .on('error', gutil.log)
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// verb.task('test', function (cb) {
//   verb.src(['index.js', 'lib/**/*.js'])
//     .on('error', gutil.log)
//     .pipe(istanbul())
//     .pipe(istanbul.hookRequire())
//     .on('finish', function () {
//       verb.src('test/*.js')
//         .pipe(mocha())
//         .pipe(istanbul.writeReports())
//         .on('end', function () {
//           verb.diff();
//           console.log();
//           cb();
//         });
//     });
// });

verb.task('default', ['readme', 'docs']);

