/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

var opts = {
  layouts: 'test/fixtures/html',
  includes: 'test/fixtures/html/includes/*.html',
};

var verb = require('../');
verb.copy('examples/templates/_html.md', 'test/actual/html.html', opts);
