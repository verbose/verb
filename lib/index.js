/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');

var base = require('cwd')();
var relative = require('relative');
var cwd = file.normalizeSlash(relative(base, __dirname));

var globOpts = {cwd: cwd, prefixBase: false, nonull: true};
file.expand(['./*.js', '!./index.js'], globOpts).forEach(function(filepath) {
  var name = path.basename(filepath, path.extname(filepath));
  exports[name] = require(path.resolve(cwd, filepath));
});

module.exports.dir = require('./utils/dir').bind(null, cwd);
