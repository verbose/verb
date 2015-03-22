'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var chalk = require('chalk');
var relative = require('relative');

/**
 * Local dependencies
 */

var cache = require('../cache');

/**
 * Expose `utils`
 */

var utils = module.exports = require('export-files')(__dirname);

/**
 * Escape/unescape delimiters
 */

utils.escape = function escape(file, next) {
  file.content = file.content.split('{%%').join('__DELIM__');
  next();
};

utils.unescape = function unescape(file, next) {
  file.content = file.content.split('__DELIM__').join('{%');
  next();
};

/**
 * Coerce value to an array.
 *
 * @api private
 */

utils.arrayify = function arrayify(val) {
  var isArray = Array.isArray(val);
  if (typeof val !== 'string' && !isArray) {
    throw new Error('utils.arrayify() expects a string or array.');
  }
  return isArray ? val : [val];
};

/**
 * Try to require a file, fail silently. Encapsulating try-catches
 * also helps with v8 optimizations.
 *
 * @api private
 */

utils.tryRequire = function tryRequire(fp) {
  if (typeof fp === 'undefined') {
    throw new Error('utils.tryRequire() expects a string.');
  }

  var key = 'tryRequire:' + fp;
  if (cache.hasOwnProperty(key)) {
    return cache[key];
  }

  try {
    return (cache[key] = require(path.resolve(fp)));
  } catch(err) {
    console.error(chalk.red('verb cannot find'), chalk.bold(fp), err);
  }
  return {};
};

/**
 * Get the basename of a file path, excluding extension.
 *
 * @param {String} `fp`
 * @param {String} `ext` Optionally pass the extension.
 */

utils.basename = function basename(fp, ext) {
  return fp.substr(0, fp.length - (ext || path.extname(fp)).length);
};

/**
 * Default `renameKey` function.
 *
 * ```js
 * {%= include("foo/bar/baz") %}
 * ```
 *
 * @param {String} `filepath`
 * @param {Object} `acc` Accumulator object from [map-files]
 * @param {Object} `opts`
 * @param {String} `ext` Optionally pass the extension.
 */

utils.renameKey = function renameKey(fp, acc, opts) {
  fp = relative.toBase(opts.cwd, fp);
  return utils.basename(fp);
};

/**
 * Ensure that a file extension is formatted properly.
 *
 * @param {String} `ext`
 */

utils.formatExt = function formatExt(ext) {
  if (ext && ext[0] !== '.') ext = '.' + ext;
  return ext;
};
