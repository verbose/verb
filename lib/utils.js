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
require('base-store', 'store');

// misc
require('define-property', 'define');
require('stream-exhaust', 'exhaust');
require('extend-shallow', 'extend');
require('global-modules', 'gm');
require('isobject', 'isObject');
require('through2', 'through');
require('template-toc', 'toc');
require('get-value', 'get');
require('set-value', 'set');
require('matched', 'glob');
require('is-valid-glob');
require('resolve-dir');
require('has-glob');
require('resolve');
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
 * Try to read a directory
 */

utils.tryResolve = function(fp, cwd) {
  try {
    cwd = utils.resolveDir(cwd || process.cwd());
    return utils.resolve.sync(fp, { basedir: cwd });
  } catch (err) {}
  return null;
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
 * Resolve module the module to use from the given cwd.
 *
 * @param {String} `name`
 * @return {String|Null}
 */

utils.resolveModule = function(name, cwd) {
  if (typeof name === 'undefined') {
    throw new TypeError('expected name to be a string');
  }
  name = utils.resolveDir(name);
  if (cwd && path.basename(cwd) === name) {
    var fp = utils.tryResolve(cwd);
    if (fp) return fp;
  }

  return utils.tryResolve(name, cwd)
    || utils.tryResolve(name, utils.gm)
    || utils.tryResolve(name);
};

/**
 * Try to resolve and load a module, either from the given
 * cwd or from global npm packages.
 *
 * @param {String} `name`
 * @return {String|Null}
 */

utils.loadModule = function(name, cwd) {
  var main = utils.resolveModule(name, cwd);
  return main ? utils.tryRequire(main) : null;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
