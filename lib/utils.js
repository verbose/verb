'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('data-store', 'store');
require('mixin-deep', 'merge');
require('get-value', 'get');
require('set-value', 'set');
require('defaults-shallow', 'defaults');
require('parser-front-matter', 'matter');
require('resolve-dir');
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

utils.resolveConfig = function (config, fn) {
  fn = fn || utils.identity;
  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      var val = utils.npm(resolveDir(config[key]));
      fn(key, val);
    }
  }
};

/**
 * Expose utils
 */

module.exports = utils;
