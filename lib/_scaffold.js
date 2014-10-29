'use strict';

var verb = require('..');

verb.task('default', function() {
  verb.src('.verbrc.md')
    .pipe(verb.dest('temp'));
});
