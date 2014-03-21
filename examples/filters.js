var verb = require('../');

verb.read('docs/README.tmpl.md', {
  verbose: true,
  filters: ['test/filters/*.js']
});

verb.verbose.warn('>> Task ran in verbose mode.');