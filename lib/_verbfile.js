'use strict';

var verb = require('..');

/**
 * This is the default verbfile used when
 * one isn't found in the root of a project.
 */

verb.task('default', function() {
  verb.src('.verb*.md')
    .pipe(verb.dest('.'));
});
