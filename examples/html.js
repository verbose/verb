/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var opts = {
  layouts: 'test/fixtures/html',
  includes: 'test/fixtures/html/includes/*.html',
};

var phaser = require('../');
phaser.copy('examples/templates/_html.md', 'test/actual/html.html', opts);
