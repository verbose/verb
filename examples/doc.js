/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var phaser = require('../');

var opts = {
  verbose: false,

  glob: {
    cwd: 'test/fixtures',
    ext: '.md',
  },
  filters: ['./lib/filters/*.js']
};

var dest = './test/actual/';
phaser.expand(['docs/*.md'], dest, opts);