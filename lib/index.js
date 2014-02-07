/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

// Local libs
var utils = require('./utils');


var globOpts = {cwd: __dirname, prefixBase: false, nonull: true};
utils.expand(['*.js', '!index.js'], globOpts).forEach(function(filepath) {
  var name = path.basename(filepath, path.extname(filepath));
  exports[name] = require(path.resolve(__dirname, filepath));
});


// console.log(lib.dir());
module.exports.dir = require('./utils/dir').bind(null, __dirname);

