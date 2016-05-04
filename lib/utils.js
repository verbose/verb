'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('ansi-colors', 'colors');
require('base-runner', 'runner');
require('extend-shallow', 'extend');
require('fs-exists-sync', 'exists');
require('generate');
require('gulp-format-md', 'format');
require('isobject', 'isObject');
require('memoize-path', 'memo');
require('reflinks');
require('set-value', 'set');
require('through2', 'through');
require('unset-value', 'del');
require('yargs-parser', 'yargs');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
