var verb = require('../');
verb.copy('examples/templates/html.md', 'test/actual/html.html', {
  layouts: 'examples/html/',
  includes: 'examples/html/includes/',
});