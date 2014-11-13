'use strict';

var verb = require('./');
verb.data('package.json');

verb.task('default', function() {
  verb.src('.verb*.md')
    .pipe(verb.dest('./'));
});
