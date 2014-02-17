/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var path = require('path');
var file = require('fs-utils');
var relative = require('relative');
var phaser = require('../');

var opts = {
  cwd: 'docs',
  prefixBase: true,
  destBase: 'test/actual/',
  ext: '.md',
};

file.expand(['*.md'], opts).map(function(filepath) {
  phaser.init(opts);
  phaser.options = phaser.options || {};

  var name = file.base(filepath) + opts.ext;
  var dest = phaser.cwd(opts.destBase, name);

  phaser.options.src = filepath;
  phaser.options.dest = dest;

  file.writeFileSync(dest, phaser.read(filepath, opts));
  phaser.log.success('Saved to', relative(phaser.cwd(), dest));
});