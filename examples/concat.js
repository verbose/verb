/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var phaser = require('../');

phaser.expandMapping(['*.md'], 'test/actual/concat.md');

/**
 * Change the CWD
 */

phaser.expandMapping(['examples/content/*.md'], 'test/actual/concat-md.md', {cwd: process.cwd()});
