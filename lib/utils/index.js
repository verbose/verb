'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var mdu = require('markdown-utils');
var mm = require('micromatch');

/**
 * Expose `utils`
 */

var utils = require('export-files')(__dirname);

/**
 * File cache
 */

var cache = {};

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
 * Returns a matching function to use against
 * the list of given files.
 *
 * @param {Array} `files` The list of files to match against.
 * @return {Array} Array of matching files
 */

utils.files = function files(arr) {
  return function(pattern, options) {
    return mm(arr, pattern, options);
  };
};

/**
 * Try to require a file, fail silently. Encapsulating try-catches
 * also helps with v8 optimizations.
 */

utils.tryRequire = function tryRequire(fp) {
  if (typeof fp !== 'string') {
    throw new Error('utils.tryRequire() expects a string.');
  }
  var key = 'tryRequire:' + fp;
  if (cache.hasOwnProperty(key)) return cache[key];
  try {
    return (cache[key] = require(fp));
  } catch(err) {}
  try {
    return (cache[key] = require(path.resolve(fp)));
  } catch(err) {}
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
  // could be filepath with no ext, e.g. `LICENSE`
  if (typeof ext === 'undefined') return;
  if (Array.isArray(ext)) return ext.map(utils.formatExt);
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

/**
 * Detect if the user has specfied not to render a file.
 */

utils.norender = function norender(verb, file, locals) {
  var ext = file && file.ext ? utils.formatExt(ext) : null;
  if (ext && !verb.engines.hasOwnProperty(ext)) {
    return false;
  }

  return verb.isTrue('norender') || verb.isFalse('render')
    || file.norender === true    || file.render === false
    || locals.norender === true  || locals.render === false;
};

/**
 * Expose `utils`
 */

module.exports = utils;
