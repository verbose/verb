/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const _ = require('lodash');
const phaser = require('../');

// var opts = {
//   verbose: false,

//   glob: {
//     cwd: 'test/fixtures',
//     ext: '.md',
//   },
//   filters: ['./lib/filters/*.js']
// };

// var dest = './test/actual/';
// phaser.expand(['docs/*.md'], dest, opts);

var opts = {
  glob: {
    cwd: 'test/fixtures',
    ext: '.md',
    destBase: './test/actual/',
    filters: ['./lib/filters/*.js']
  }
};

var dest = opts.destBase;
phaser.expandMapping(['*.md'], dest, opts);