/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var phaser = require('../');
var opts = {
  cwd: 'examples/templates',
  ext: '.md',
  destBase: 'test/actual/',
  cache: ['test/fixtures/partials/*.js'],
  partials: ['test/fixtures/partials/*.md']
};

phaser.copy('examples/templates/README.tmpl.md', 'test/actual/partials.md', opts);