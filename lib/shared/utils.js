'use strict';

var fs = require('fs');
var mm = require('micromatch');
var parseGithubUrl = require('parse-github-repo-url');
var relative = require('relative');
var endsWith = require('ends-with');
var chalk = require('chalk');
var path = require('path');
var url = require('url');

/**
 * URL cache
 */

var cache = require('../cache');

/**
 * Expose `utils`
 */

var utils = module.exports;

/**
 * Read a file
 */

utils.readFile = function readFile(fp) {
  return fs.readFileSync(fp, 'utf8');
};

/**
 * Write a file
 */

utils.writeFile = function writeFile(fp, str) {
  return fs.writeFileSync(fp, str);
};

/**
 * Returns a matching function to use against
 * the list of given files.
 */

utils.files = function files(arr) {
  return function(pattern, options) {
    return mm(arr, pattern, options);
  };
};

/**
 * Returns a function that returns true if
 * one of the provided patterns matches
 * an existing file.
 */

utils.exists = function exists(files) {
  var matches = utils.files(files);
  return function (pattern, options) {
    return !!matches(pattern, options).length;
  };
};

/**
 * Creates a matching function to use against
 * the list of given files.
 */

utils.matchesAny = function matchesAny(patterns, opts) {
  opts = opts || {};
  opts.matchBase = true;
  return function (fp) {
    return !!mm(fp, patterns, opts).length;
  };
};

/**
 * Try to read a file, returning `null` if it doesn't exist
 * or if an error is thrown. Much faster than doing `fs.exists()`
 */

utils.tryRead = function tryRead(fp, verbose) {
  try {
    return fs.readFileSync(path.resolve(fp), 'utf8');
  } catch (err) {
    if (verbose) console.log(err);
  }
  return null;
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
 * Try to read a directory of files. Silently catches
 * any errors and returns an empty array.
 */

utils.tryReaddir = function tryReaddir(dir, verbose) {
  try {
    return fs.readdirSync(dir);
  } catch (err) {
    if (verbose) console.log(err);
  }
  return [];
};

/**
 * Try to read a directory of files. Silently catches
 * any errors and returns an empty array.
 */

utils.tryStats = function tryStats(fp, verbose) {
  try {
    return fs.statSync(fp);
  } catch (err) {
    if (verbose) console.log(err);
  }
  return null;
};

/**
 * Recursively try to read directories.
 */

utils.tryReaddirs = function tryReaddirs(dir, ignored) {
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
 * Creates a matching function to use against
 * the list of given files.
 */

utils.formatFiles = function formatFiles(files) {
  var res = [], i = 0;
  var len;

  if (files && (len = files.length)) {
    while (len--) {
      var file = files[i++];
      var stat = utils.tryStats(file);
      if (!stat) continue;

      res.push(utils.trailingSlash(file, stat));
    }
  }
  return res;
};

/**
 * Add a trailing slash to a file path.
 *
 * @param  {String} `fp`
 * @param  {Object} `stat`
 * @return {String}
 */

utils.trailingSlash = function trailingSlash(fp, stat) {
  if (typeof fp !== 'string') {
    throw new TypeError('utils.trailingSlash() expects a string.');
  }
  if (stat.isFile()) {
    return fp;
  }
  if (fp && fp[fp.length - 1] !== '/') {
    return fp + '/';
  }
  return fp;
};

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
  var key = 'parse:' + str;
  return cache[key] || (cache[key] = url.parse(str));
};

/**
 * Parse the given github URL `str` into an object. Results
 * are cached when the path is parsed.
 *
 * @param  {String} `str`
 * @return {Object}
 */

utils.parseGithub = function parseGithub(str) {
  if (typeof str !== 'string') {
    throw new Error('utils.parseGithub() requires a string.');
  }
  var key = 'parseGithub:' + str;
  if (cache[key]) {
    return cache[key];
  }

  var res = {project: '', owner: '', repo: ''};
  var parsed = parseGithubUrl(str);
  if (parsed && parsed.length) {
    res.owner = parsed[0];
    res.repo = parsed[1];
    res.project = parsed[0] + '/' + parsed[1];
  }

  return (cache[key] = res);
};

/**
 * Parse the given `str` to extract a github
 * project url.
 *
 * ```js
 * git://github.com/foo/bar.git
 * //=> 'foo/bar'
 * ```
 */

utils.project = function project(str) {
  if (typeof str !== 'string') {
    throw new Error('utils.project() requires a string.');
  }
  return utils.parseGithub(str).project;
};

/**
 * Greate a github url from a project URL.
 *
 * ```js
 * git://github.com/foo/bar.git
 * //=> 'https://github.com/foo/bar'
 * ```
 */

utils.github = function github(str) {
  if (typeof str !== 'string') {
    throw new Error('utils.github() requires a string.');
  }

  if (str.indexOf('://')) {
    str = utils.parseGithub(str).project;
  }
  return 'https://github.com/' + str;
};

/**
 * Parse the given `str` to extract the name
 * of a repo.
 *
 * ```js
 * git://github.com/foo/bar.git
 * //=> 'bar'
 * ```
 */

utils.repo = function repo(str) {
  if (typeof str !== 'string') {
    throw new Error('utils.repo() requires a string.');
  }
  var res = utils.project(str);
  if (endsWith(res, '.git')) {
    res = res.slice(0, res.indexOf('.'));
  }
  var end = res.indexOf('/');
  return res[end + 1]
    ? res.slice(end + 1)
    : res.slice(end);
};

/**
 * Parse the given `str` to extract a owner
 *
 * ```js
 * git://github.com/foo/bar.git
 * //=> 'foo'
 * ```
 */

utils.owner = function owner(str) {
  if (typeof str !== 'string') {
    throw new Error('utils.owner() requires a string.');
  }

  var res = utils.parseGithub(str).owner;
  var end = res.indexOf('/');
  if (end !== -1) {
    return res.slice(0, end);
  }
  return res;
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

utils.isKnownRepo = function isKnownRepo(repo, arr) {
  var orgs = arr || ['jonschlinkert', 'doowb', 'assemble', 'verb', 'helpers', 'regexps'];

  if (typeof repo !== 'string') {
    throw new Error('utils.isKnownRepo() expects a string.');
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
