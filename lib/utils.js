'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('async');
require('resolve-dir');
require('helper-related', 'related');
require('helper-reflinks', 'reflinks');
require('readme-includes', 'includes');
require('get-value', 'get');
require('set-value', 'set');
require('composer-runtimes', 'runtimes');
require('extend-shallow', 'extend');
require('parser-front-matter', 'matter');
require('middleware-utils', 'mu');
require('engine-base', 'engine');
require('map-config', 'Config');
require = fn;

utils.basename = function(key) {
  return path.basename(key, path.extname(key));
};

utils.arrayify = function(val) {
  return Array.isArray(val) ? val : [val];
};

utils.tryRequire = function(name) {
  try {
    return require(name);
  } catch(err) {}
  return null;
};

utils.tryRead = function(fp) {
  try {
    return fs.readFileSync(fp);
  } catch(err) {}
  return null;
};

utils.npm = function(name) {
  return utils.tryRequire(name) || utils.tryRequire(utils.resolve(name));
};

utils.resolve = function(fp) {
  return path.resolve(utils.resolveDir(fp));
};

utils.identity = function(val) {
  return val;
};

utils.rename = function(key) {
  var cwd = this.options.cwd;
  if (!cwd || key.indexOf(cwd) === -1) {
    return key;
  }
  var len = cwd.length + 1;
  return key.slice(len);
};

/**
 * Run middleware in series
 *
 * ```js
 * var fns = require('./fns/');
 *
 * app.onLoad(/\.js$/, utils.series([
 *   fns.foo,
 *   fns.bar,
 *   fns.baz,
 * ]));
 * ```
 * @param {Array} `fns` Array of middleware functions
 * @api public
 */

exports.series = function(fns) {
  return function (file, cb) {
    utils.async.eachSeries(fns, function (fn, next) {
      fn(file, next);
    }, cb);
  };
};

/**
 * Run middleware in parallel.
 *
 * ```js
 * var fns = require('./fns/');
 *
 * app.onLoad(/\.js$/, utils.parallel([
 *   fns.foo,
 *   fns.bar,
 *   fns.baz,
 * ]));
 * ```
 * @param {Array} `fns` Array of middleware functions
 * @api public
 */

exports.parallel = function(fns) {
  return function (file, cb) {
    utils.async.each(fns, function (fn, next) {
      fn(file, next);
    }, cb);
  };
};

/**
 * Expose utils
 */

module.exports = utils;
