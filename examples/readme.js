/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

var chalk = require('chalk');
var file = require('fs-utils');
var phaser = require('../');

/**
 * Although Phaser can do everything in this example
 * without external libs, this is intended to show
 * how you can use Phaser for only what you need, and
 * use other libs to handle the rest.
 */

var content = phaser.file.read('README.tmpl.md');
var rendered = phaser.process(content).content;

file.writeFileSync('README.md', rendered);
console.log();
