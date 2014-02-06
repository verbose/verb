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
  cwd: 'test/fixtures',
  ext: '.md',
  destBase: './test/actual/'
  // mixins: ['./lib/mixins/*.js']
};

var dest = opts.destBase;
phaser.expand('*.md', dest, _.extend({glob: {srcbase: opts.cwd}}, opts));