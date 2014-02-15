/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');

var phaser = require('../../');
var cwd = phaser.cwd(__dirname);

// Globule options
var globOpts = {cwd: cwd, prefixBase: false, nonull: true};
file.expand(['*.js', '!index.js'], globOpts).forEach(function(filepath) {
  exports[file.base(filepath)] = require(path.resolve(cwd, filepath));
});

module.exports.dir = require('./dir').bind(null, cwd);