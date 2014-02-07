/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var chalk = require('chalk');
var file = require('fs-utils');
var pkg = file.readJSONSync(path.join(__dirname, '../..', 'package.json'));

var warn = chalk.yellow;
var stun = chalk.magenta.bold;
var kill = chalk.red.bold;


exports.header = function() {
  console.log(stun('phaser-cli (v' + pkg.version + '): ') + pkg.description);
  console.log('');
};