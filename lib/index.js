/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

var fs = require('fs');
var utils = require('./utils');

fs.readdirSync(__dirname + '/').forEach(function(filepath) {
  if (utils.isJavaScript(filepath) !== null && filepath !== 'index.js') {
    exports[utils.name(filepath)] = require('./' + filepath);
  }
});