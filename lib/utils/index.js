/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');


// Globule options
var globOpts = {cwd: __dirname, prefixBase: false, nonull: true};
file.expand(['*.js', '!index.js'], globOpts).forEach(function(filepath) {
  // console.warn("UTILS:", filepath);
  exports[file.base(filepath)] = require(path.resolve(__dirname, filepath));
});

module.exports.dir = require('./dir').bind(null, __dirname);