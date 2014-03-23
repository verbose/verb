/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var verb = require('../');

verb.expand(['docs/*.md'], 'test/actual/concat.md');
verb.expand(['examples/templates/*.md'], 'test/actual/concat-md.md');
