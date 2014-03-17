/**
 * Verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */


'use strict';

var path = require('path');
var chalk = require('chalk');
var file = require('fs-utils');

var verb = require('../../');
var meta = verb.verbMetadata;

var warn = chalk.yellow;
var info = chalk.cyan.bold;
var bold = chalk.bold;

exports.header = function() {
  console.log(info('verb-cli (v' + meta.version + '): ') + bold(meta.description));
  console.log('');
};