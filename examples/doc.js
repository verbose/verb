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
  cwd: 'docs',
  ext: '.md',
  // mixins: ['./lib/mixins/*.js']
};

var dest = './test/actual/';
phaser.expand('_glossary.md', dest, _.extend(opts, {dest: dest}));
