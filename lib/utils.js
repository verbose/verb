'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

// helpers
require('helper-reflinks', 'reflinks');
require('helper-related', 'related');

// plugins and extensions
require('common-middleware', 'middleware');
require('assemble-loader', 'loader');
require('base-questions', 'ask');
require('base-pipeline', 'pipeline');
require('base-runner', 'runner');
require('base-config', 'config');
require('base-store', 'store');

// streams
require('stream-exhaust', 'exhaust');
require('extend-shallow', 'extend');
require('get-value', 'get');
require('matched', 'glob');
require('is-valid-glob');
require('through2');
require('has-glob');
require('async');

// cli
require('success-symbol');
require('ansi-colors', 'colors');
require('time-stamp', 'stamp');

/**
 * Restore `require`
 */

require = fn;

/**
 * Convenience method for loading files.
 */

utils.globFiles = function(patterns, options) {
  var opts = utils.extend({dot: true}, options);
  opts.cwd = opts.cwd || process.cwd();
  opts.ignore = ['**/.DS_Store', '**/.git'];
  opts.realpath = true;
  return utils.glob.sync(patterns, opts);
};

/**
 * Create a formatted timestamp
 *
 * @param {String} msg
 * @return {String}
 */

utils.timestamp = function(msg) {
  var time = ' ' + utils.colors.gray(utils.stamp('HH:mm:ss.ms', new Date()));
  return console.log(time, msg, utils.colors.green(utils.successSymbol));
};

/**
 * Try to read a directory
 */

utils.tryReaddir = function(dir) {
  try {
    return fs.readdirSync(dir);
  } catch (err) {}
  return [];
};

/**
 * Try to require a file
 */

utils.tryRequire = function(name) {
  try {
    return require(name);
  } catch (err) {}

  try {
    return require(path.resolve(name));
  } catch (err) {}
  return {};
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
