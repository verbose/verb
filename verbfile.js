'use strict';

var verb = require('./');

// verb.layout('foo.md', 'AAA\n<<% body %>>');

verb.task('readme', function() {
  verb.src('.verb*.md')
    .pipe(verb.dest('.'));
});

verb.task('docs', function() {
  verb.src('docs/.verb/*.md')
    .pipe(verb.dest('docs'));
});

verb.task('default', ['readme', 'docs']);