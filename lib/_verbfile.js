'use strict';

var verb = require('..');

/**
 * This is the default verbfile used if one isn't found
 * in the root of a project.
 */

verb.task('readme', function() {
  verb.src('.verb*.md')
    .pipe(verb.dest('./'));
});

verb.task('docs', function() {
  verb.src('docs/.verb/**/*.md')
    .pipe(verb.dest('./'));
});

verb.task('default', ['readme', 'docs']);