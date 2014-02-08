/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var phaser = require('../');
var _ = require('lodash');


var opts = {
  cwd: 'test/fixtures',
  ext: '.md',
  destBase: './test/actual/',
  partials: ['./test/fixtures/partials/*.md']
};


phaser.copy('test/fixtures/authors.md', 'test/actual/authors.md', opts);
