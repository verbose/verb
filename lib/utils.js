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

utils.parse = function(str) {
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

utils.repo = function(str) {
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

utils.username = function(str) {
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

utils.project = function(str) {
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

utils.tryRequire = function(fp) {
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

utils.arrayify = function(val) {
  return Array.isArray(val) ? val : [val];
};

/**
 * Known orgs (this is a temporary solution for
 * sandboxing certain data transformations to
 * our own projects to minimize unintended
 * mutations)
 */

var orgs = ['jonschlinkert', 'doowb', 'assemble', 'verb', 'helpers', 'regexps'];
utils.isKnownRepo = function(str) {
  var len = orgs.length;
  while(len--) {
    var ele = orgs[len];
    if (str.indexOf(ele) !== -1) {
      return true;
    }
  }
  return false;
};
