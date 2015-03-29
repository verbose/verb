'use strict';

var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var through = require('through2');
var verb = require('./');

verb.disable('debugEngine');
verb.data({author: {username: 'jonschlinkert'}})

// verb.data({travis: '', username: 'jonschlinkert'});
// verb.data({twitter: {username: 'jonschlinkert'}, github: {username: 'jonschlinkert'}});

verb.task('readme', function () {
  // console.log(verb.get('missing'))
  return verb.src('.verb.md')
    .on('error', gutil.log)
    .pipe(tmpl())
    .pipe(verb.dest('test/actual'))
    .on('end',function () {
      // console.log(verb.get('errors'))
    })
    .on('error', gutil.log);
});

verb.task('docs', function () {
  return verb.src('docs/*.md')
    .on('error', gutil.log)
    .pipe(verb.dest('test/actual'))
    .on('error', gutil.log);
});

verb.task('helpers', function () {
  return verb.src('test/fixtures/templates/helpers.md')
    .pipe(verb.dest('test/actual'))
    .on('error', gutil.log);
});

// verb.task('context', function () {
//   return verb.src('support/readme-*/templates/**/*.md')
//     .pipe(context())
//     .pipe(verb.dest('test/actual'))
// });

// function context(options) {
//   var props = [], helpers = [];

//   return through.obj(function (file, enc, cb) {
//     var str = file.contents.toString();
//     var match, re = /\{%=([\s\S]+?)%}/;

//     // detect template variables used in the current file
//     while (match = re.exec(str)) {
//       str = str.split(match[0]).join('');
//       var prop = match[1].trim();
//       if (props.indexOf(prop) === -1 && /^[\w.]+$/.test(prop)) {
//         props.push(prop);
//       }
//       var helper = /(\w+)\(/.exec(prop);
//       if (helper) {
//         helper = helper[1].trim();
//         if (helpers.indexOf(helper) === -1) {
//           helpers.push(helper);
//         }
//       }
//     }
//     cb();
//   }, function (cb) {
//   console.log(props.sort())
//   console.log(helpers.sort())
//    cb();
//   });
// }

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

