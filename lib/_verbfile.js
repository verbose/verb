'use strict';

var verb = require('..');
// var dest = require('verb-rename')(verb);

verb.data('package.json');
verb.data({runner: {name: 'verb', url: 'https://github.com/jonschlinkert/verb'}});

verb.layout('default.md', '<foo>\n<<% body %>>\n</foo>');
verb.includes('includes/*.md');
verb.docs('docs/*.md');

verb.task('foo', function() {
  verb.src('.verbrc.md')
    .pipe(verb.dest('temp'));
});

verb.task('readme', function() {
  verb.src('.verbrc.md')
    .pipe(verb.dest('./'));
});

verb.task('default', ['foo', 'readme']);
