/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var verb = require('../');

var dest = 'test/actual/comments.md';

verb.copy('examples/templates/comments.md', dest, {dest: dest});
console.log('Done.')