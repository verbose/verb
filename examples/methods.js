/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var verb = require('../');



/**
 * Example source file with {%= methods() %} tag,
 * ceates a list of methods from the specified file.
 */

var dest = 'test/actual/methods.md';
verb.copy('examples/templates/methods.md', dest, {dest: dest});