/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var file = require('fs-utils');
var phaser = require('../');

var opts = {phaserrc: 'examples/.phaserrc'};
var globOpts = {
  cwd: 'docs',
  ext: '.md',
  destBase: 'test/actual/'
};

file.expandMapping(['*.md'], globOpts).map(function(fp) {
  file.writeFileSync(fp.dest, phaser.read(fp.src, opts));
  phaser.log.success('Saved to', fp.dest);
});