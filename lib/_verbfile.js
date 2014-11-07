'use strict';

var verb = require('..');

verb.data('package.json');
verb.data({runner: {name: 'verb', url: 'https://github.com/jonschlinkert/verb'}});

verb.task('readme', function() {
  verb.src('.verb*.md')
    .pipe(verb.dest('./'));
});

verb.task('default', ['readme']);