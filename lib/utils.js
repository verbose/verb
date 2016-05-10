'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-runner', 'runner');
require('extend-shallow', 'extend');
require('fs-exists-sync', 'exists');
require('generate');
require('get-value', 'get');
require('gulp-format-md', 'format');
require('reflinks');
require('set-value', 'set');
require('through2', 'through');
require('yargs-parser', 'yargs');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
