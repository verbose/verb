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
  cwd: 'examples/templates',
  ext: '.md',
  destBase: 'test/actual/',
  cache: ['test/fixtures/partials/*.js'],
  partials: ['test/fixtures/partials/*.md']
};

phaser.copy('examples/templates/README.tmpl.md', 'test/actual/partials.md', opts);