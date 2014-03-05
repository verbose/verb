/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var phaser = require('../');

var dest = 'test/actual/comments.md';

phaser.copy('examples/templates/comments.md', dest, {dest: dest});