/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const file = require('fs-utils');
const relative = require('relative');
const phaser = require('../');

var opts = {
  cwd: 'docs',
  prefixBase: true,
  destBase: 'test/actual/',
  ext: '.md',
};

file.expand(['*.md'], opts).map(function(filepath) {
  phaser.init(opts);

  var name = file.base(filepath) + opts.ext;
  var dest = phaser.cwd(opts.destBase, name);

  file.writeFileSync(dest, phaser.read(filepath, opts));
  phaser.log.success('Saved to', relative(phaser.cwd(), dest));
});