/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const file = require('fs-utils');
const phaser = require('../');

var opts = {
  cwd: 'docs',
  ext: '.md',
  destBase: './test/actual/'
};

file.expandMapping(['*.md'], opts).map(function(fp) {
  file.writeFileSync(fp.dest, phaser.read(fp.src, {name: 'Phaser'}));
});