/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var expand = require('./expand');


// Globule options
var globOpts = {cwd: __dirname, prefixBase: false, nonull: true};

expand(['*.js', '!index.js'], globOpts).forEach(function(filepath) {
  exports[file.base(filepath)] = require(path.resolve(__dirname, filepath));
});

// console.log(utils.dir());
module.exports.dir = require('./dir').bind(null, __dirname);