/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var phaser = require('../');

var opts = {
  cwd: 'docs',
  ext: '.md',
  // mixins: ['./lib/mixins/*.js']
};

phaser.expand('_test.md', 'test/actual/', opts);
