'use strict';

var fs = require('fs');

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
require('base-runner');
require('base-store', 'store');
require('base-questions', 'ask');
require('assemble-loader', 'loader');
require('common-middleware', 'middleware');

require('extend-shallow', 'extend');
require('ansi-colors', 'colors');
require('time-stamp', 'stamp');
require('matched', 'glob');
require('success-symbol');
require('assemble-core');
require('is-valid-glob');
require('has-glob');
require('async');

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
