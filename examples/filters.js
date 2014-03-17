/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

var verb = require('../');

verb.read('docs/README.tmpl.md', {verbose: true, filters: ['test/filters/*.js']});

verb.verbose.warn('>> Task ran in verbose mode.');