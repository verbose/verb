'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var relative = require('relative');
var mdu = require('markdown-utils');
var mm = require('micromatch');
var Vinyl = require('vinyl');
var _ = require('lodash');

/**
 * File cache
 */

var cache = {};

/**
 * Expose `utils`
 */

var utils = module.exports = require('export-files')(__dirname);

/**
 * Create a url from the given `domain`, optionally pass `true`
 * as the second argument to use `https` as the protocol.
 *
 * @param  {String} `domain`
 * @param  {String} `https`
 * @return {String}
 */

utils.linkify = function linkify(domain, https) {
  return function (author) {
    if (typeof author !== 'object') {
      throw new TypeError('utils.linkify expects author to be an object.');
    }

    var username = author.username;
    if (typeof username === 'undefined') {
      username = this.context[domain] && this.context[domain].username;
    }

    if (typeof username === 'undefined') {
      username = this.config.get(domain + '.username');
    }

    if (typeof username === 'object') {
      var o = username;
      username = o.username;
    }

    if (!username) return '';

    var protocol = https ? 'https://' : 'http://';
    var res = mdu.link(domain + '/' + username, protocol + domain + '.com/' + username);
    return '+ ' + res;
  };
};

/**
 * Bind a `thisArg` to all the functions on the target
 *
 * @param  {Object|Array} `target` Object or Array with functions as values that will be bound.
 * @param  {Object} `thisArg` Object to bind to the functions
 * @return {Object|Array} Object or Array with bound functions.
 */

utils.bindAll = function bindAll(target, thisArg) {
  if (Array.isArray(target)) {
    return target.map(function (fn) {
      return _.bind(fn, thisArg);
    });
  }

  return _.reduce(target, function (acc, fn, key) {
    if (typeof fn === 'object' && typeof fn !== 'function') {
      acc[key] = utils.bindAll(fn, thisArg);
    } else {
      acc[key] = _.bind(fn, thisArg);
      if (fn.async) {
        acc[key].async = fn.async;
      }
    }
    return acc;
  }, {});
};

/**
 * Push a collection of templates into the stream (as vinyl files)
 */

utils.pushToStream = function pushToStream(collection, stream, fn) {
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      stream.push(typeof fn === 'function' ? fn(collection[key], Vinyl) : collection[key]);
    }
  }
};

/**
 * Returns a matching function to use against
 * the list of given files.
 */

utils.files = function files_(arr) {
  return function(pattern, options) {
    return mm(arr, pattern, options);
  };
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
 * Try to read a directory.
 */

utils.tryReaddir = function tryReaddir(dir) {
  if (typeof dir === 'undefined') {
    throw new Error('utils.tryReaddir() expects a string.');
  }
  try {
    return fs.readdirSync(dir);
  } catch(err) {}
  return [];
};

/**
 * Recursively try to read directories.
 */

utils.tryReaddirs = function tryReaddirs(dir, ignored) {
  if (typeof dir === 'undefined') {
    throw new Error('utils.tryReaddirs() expects a string.');
  }

  var files = utils.tryReaddir(dir);
  var res = [], len = files.length, i = 0;

  var isIgnored = utils.matchesAny(ignored);
  while (len--) {
    var fp = relative(path.resolve(dir, files[i++]));
    if (isIgnored(fp)) continue;

    var stat = utils.tryStats(fp);
    if (!stat) continue;

    if (stat.isDirectory()) {
      if (fp.indexOf('.git') !== -1) {
        continue;
      }
      res.push.apply(res, tryReaddirs(fp, ignored));
    }
    res.push(fp);
  }
  return res;
};

/**
 * Try to read a directory of files. Silently catches
 * any errors and returns an empty array.
 */

utils.tryStats = function tryStats(fp, verbose) {
  if (typeof fp === 'undefined') {
    throw new Error('utils.tryStats() expects a string.');
  }

  try {
    return fs.statSync(fp);
  } catch (err) {
    if (verbose) console.log(err);
  }
  return null;
};

/**
 * Get the basename of a file path, excluding extension.
 *
 * @param {String} `fp`
 * @param {String} `ext` Optionally pass the extension.
 */

utils.basename = function basename(fp, ext) {
  if (typeof fp === 'undefined') {
    throw new Error('utils.basename() expects a string.');
  }
  return fp.substr(0, fp.length - (ext || path.extname(fp)).length);
};

/**
 * Ensure that a file extension is formatted properly.
 *
 * @param {String} `ext`
 */

utils.formatExt = function formatExt(ext) {
  if (typeof ext !== 'string') {
    throw new TypeError('verb#utils.formatExt expects ext to be a string.');
  }
  if (ext.charAt(0) !== '.') ext = '.' + ext;
  return ext;
};

/**
 * Cast `val` to an array.
 */

utils.arrayify = function arrayify(val) {
  var isArray = Array.isArray(val);
  if (typeof val !== 'string' && !isArray) {
    throw new Error('utils.arrayify() expects a string or array.');
  }
  return isArray ? val : [val];
};
