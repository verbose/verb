var opts = {
  layouts: 'test/fixtures/html',
  includes: 'test/fixtures/html/includes/*.html',
};

var verb = require('../');
verb.copy('examples/templates/_html.md', 'test/actual/html.html', opts);
