/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const file = require('fs-utils');
const phaser = require('../');

var opts = {};
var globOpts = {
  cwd: 'docs',
  prefixBase: true,
  destBase: 'test/actual/',
  ext: '.md',
};


file.expand(['*.md'], globOpts).map(function(filepath) {
  var name = file.base(filepath);
  var dest = path.join('test/actual/expand', name);

  file.writeFileSync(dest, phaser.read(filepath, opts));
  phaser.log.success('Saved to', dest);
});