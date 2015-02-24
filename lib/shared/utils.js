'use strict';

var endsWith = require('ends-with');
var chalk = require('chalk');
var path = require('path');
var url = require('url');

/**
 * Expose `utils`
 */

var utils = module.exports;

/**
 * URL cache
 */

var cache = {};

/**
 * Parse the given URL `str` into an object. Results
 * are cached when a path is parsed.
 *
 * @param  {String} `str`
 * @return {Object}
 */

utils.parse = function parse(str) {
  if (typeof str !== 'string') {
    throw new Error('utils.parse() requires a string.');
  }

  return cache[str] || (cache[str] = url.parse(str));
};

/**
 * Parse the given `str` to extract a github
 * repo url.
 *
 * ```js
 * git://github.com/foo/bar.git
 * //=> 'foo/bar'
 * ```
 */

utils.repo = function repo(str) {
  if (typeof str !== 'string') {
    throw new Error('utils.repo() requires a string.');
  }

  var res = utils.parse(str).path;
  return res.charAt(0) === '/'
    ? res.slice(1)
    : res;
};

/**
 * Parse the given `str` to extract a username
 *
 * ```js
 * git://github.com/foo/bar.git
 * //=> 'foo'
 * ```
 */

utils.username = function username(str) {
  if (typeof str !== 'string') {
    throw new Error('utils.username() requires a string.');
  }

  var res = utils.repo(str);
  var end = res.indexOf('/');
  if (end !== -1) {
    return res.slice(0, end);
  }
  return res;
};

/**
 * Parse the given `str` to extract the name
 * of a project.
 *
 * ```js
 * git://github.com/foo/bar.git
 * //=> 'bar'
 * ```
 */

utils.project = function project(str) {
  if (typeof str !== 'string') {
    throw new Error('utils.project() requires a string.');
  }

  var res = utils.repo(str);
  if (endsWith(res, '.git')) {
    res = res.slice(0, res.indexOf('.'));
  }
  var end = res.indexOf('/');
  return res[end + 1]
    ? res.slice(end + 1)
    : res.slice(end);
};

/**
 * Try to require a file, fail silently. Encapsulating try-catches
 * also helps with v8 optimizations.
 *
 * @api private
 */

utils.tryRequire = function tryRequire(fp) {
  if (typeof fp === 'undefined') {
    throw new Error('utils.tryRequire() requires a string.');
  }

  try {
    return require(path.resolve(fp));
  } catch(err) {
    console.error(chalk.red('verb cannot find'), chalk.bold(fp), err);
  }
  return {};
};

/**
 * Coerce value to an flattened, dense array.
 *
 * @api private
 */

utils.arrayify = function arrayify(val) {
  if (typeof val !== 'string' && !Array.isArray(val)) {
    throw new Error('utils.arrayify() requires a string or array.');
  }
  return Array.isArray(val) ? val : [val];
};

/**
 * Known orgs (this is a temporary solution for
 * sandboxing certain data transformations to
 * our own projects to minimize unintended
 * mutations)
 */

utils.isKnownRepo = function isKnownRepo(val, arr) {
  var orgs = arr || ['jonschlinkert', 'doowb', 'assemble', 'verb', 'helpers', 'regexps'];

  if (typeof val !== 'string' && typeof val !== 'object') {
    throw new Error('utils.isKnownRepo() expects a string.');
  }

  var repo = '';
  if (typeof val === 'string') {
    repo += val;
  } else if (typeof val === 'object' && val.url) {
    repo += val.url;
  } else {
    return false;
  }

  var len = orgs.length;
  while(len--) {
    var ele = orgs[len];
    if (utils.contains(repo, ele)) {
      return true;
    }
  }
  return false;
};

/**
 * Return true if `file.path` contains the given
 * string. We know if it passes through the stream
 * that the file exists.
 *
 * @param  {Object} `file`
 * @param  {String} `str`
 * @return {Boolean}
 */

utils.contains = function contains(str, ch) {
  return str.indexOf(ch) !== -1;
};

/**
 * Get a `username/name` github url string.
 *
 * @param  {String} `url`
 * @return {String}
 */

// utils.repo = function repo(str) {
//   return str.replace(/\w+:\/\/github.com\/(.*?)(?:\.git)?$/, '$1');
// };
