/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const file = require('fs-utils');
const _ = require('lodash');
const phaser = require('../');

var opts = {};
var globOpts = {
  cwd: 'docs',
  ext: '.md',
  destBase: 'test/actual/'
};

file.expandMapping(['*.md'], globOpts).map(function(fp) {
  file.writeFileSync(fp.dest, phaser.read(fp.src, opts));
  phaser.log.success('Saved to', fp.dest);
});