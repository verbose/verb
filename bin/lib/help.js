/**
 * phaser <https://github.com/assemble/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */


'use strict';

var path = require('path');
var chalk = require('chalk');
var file = require('fs-utils');
var pkg = file.readJSONSync(path.join(__dirname, '../..', 'package.json'));

var warn  = chalk.yellow;
var stun  = chalk.magenta.bold;
var omega = chalk.bold;
var kill  = chalk.red.bold;


exports.header = function() {
  console.log(stun('phaser-cli (v' + pkg.version + '): ') + omega(pkg.description));
  console.log('');
};

console.log(exports.header());