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
require('composer-runtimes', 'runtimes');
require('assemble-loader', 'loader');
require('base-questions', 'ask');
require('base-pipeline', 'pipeline');
require('base-runner', 'runner');
require('template-toc', 'toc');
require('base-store', 'store');
require('base-list', 'list');

// misc
require('arr-flatten', 'flatten');
require('array-unique', 'unique');
require('async');
require('define-property', 'define');
require('expand');
require('extend-shallow', 'extend');
require('get-value', 'get');
require('global-modules', 'gm');
require('has-glob');
require('has-value', 'has');
require('is-primitive');
require('is-valid-glob');
require('isobject', 'isObject');
require('kind-of', 'typeOf');
require('map-config', 'mapper');
require('matched', 'glob');
require('mixin-deep', 'merge');
require('object-visit', 'visit');
require('opn');
require('parse-github-url');
require('resolve');
require('resolve-dir');
require('set-value', 'set');
require('stream-exhaust', 'exhaust');
require('through2', 'through');
require('unset-value', 'del');

// cli
require('success-symbol');
require('ansi-colors', 'colors');
require('time-stamp', 'stamp');

// expanders
require('parse-author');
require = fn;

/**
 * Handle render errors
 */

utils.handleError = function handleError(app) {
  return function(err, cb) {
    var m = /(\w+) is not a function/.exec(err.message);
    var msg = '';

    if (m && m[1] === 'license') {
      console.error(utils.colors.red('ERROR: the license() helper was converted to a string'));
      console.error(utils.colors.red('variable in verb 0.9.0 due npm\'s deprecation of non-string formats'));
      console.error(utils.colors.red('Fix this in your templates by changing: `license()` to `license`'));
      console.error(utils.colors.red('or do `npm i -g update && update` to do it automatically'));
      return;
    }

    if (m) {
      msg = err.message + ': "' + m[1] + '()" is defined as a helper\n'+ 'in `.verb.md`, but "' + m[1] + '" is defined on verb.cache.data as a "' + typeof app.cache.data[m[1]] + '"';
    }
    if (app.options.verbose) {
      console.error(msg);
      console.error(err.stack);
    } else {
      console.error(err.message);
      console.error(msg);
    }

    if (typeof cb === 'function') {
      cb();
    }
  };
};

/**
 * Get a home-relative filepath
 */

utils.homeRelative = function(fp) {
  fp = path.relative(utils.resolveDir('~/'), fp);
  return utils.colors.green('~/' + fp);
};

/**
 * Green checkmark
 *
 * @return {String}
 */

utils.success = function() {
  return utils.colors.green(utils.successSymbol);
};

/**
 * Create a formatted timestamp
 *
 * @param {String} msg
 * @return {String}
 */

utils.timestamp = function(msg, stamp) {
  var time = '[' + utils.colors.gray(utils.stamp('HH:mm:ss', new Date())) + ']';
  console.log(time, msg);
};

utils.defaults = function(a, b) {
  a = utils.tableize(a || {});
  b = utils.tableize(b || {});

  var akeys = Object.keys(a);
  var bkeys = [];
  var res = {};

  for (var key in b) {
    bkeys.push(key);
    var orig = utils.get(a, key);
    var val = utils.get(b, key);

    if (key.indexOf('.') > -1) {
      var seg = key.split('.').shift();
      if (bkeys.indexOf(seg) === -1) {
        bkeys.push(seg);
      }
    }

    if (val && !orig) {
      utils.set(res, key, val);
    } else {
      utils.set(res, key, orig || val);
    }
  }

  akeys.forEach(function(key) {
    if (bkeys.indexOf(key) === -1) {
      utils.set(res, key, utils.get(a, key));
    }
  });
  return res;
};

utils.expandConfig = function(config, data) {
  var expand, res;
  try {
    expand = utils.expand(config);
    data = utils.merge({}, config, data);
    res = expand(config, data);
  } catch (err) {
    return config;
  }

  function format(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var val = obj[key];
        if (Array.isArray(val)) {
          obj[key] = utils.unique(utils.flatten(val)).sort();
        } else if (utils.isObject(val)) {
          obj[key] = format(val);
        } else {
          obj[key] = val;
        }
      }
    }
    return obj;
  }
  return format(res);
};

/**
 * Cast val to an array.
 */

utils.arrayify = function(val) {
  if (typeof val === 'undefined' || val === null || val === '') {
    return [];
  }
  return Array.isArray(val) ? val : [val];
};

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

utils.toRepo = function(gh) {
  if (utils.isObject(gh)) {
    gh = gh.url;
  }
  if (!/https:/.test(gh)) {
    return gh;
  }
  var parsed = utils.parseGithubUrl(gh);
  return parsed.repopath;
};

utils.toGithub = function(repo, filepath) {
  return 'https://github.com/'
    + utils.toRepo(repo) + '/blob/master/'
    + filepath;
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
 * Modified from the `tableize` lib, which replaces
 * dashes with underscores, and we don't want that behavior.
 * Tableize `obj` by flattening and normalizing the keys.
 *
 * @param {Object} obj
 * @return {Object}
 * @api public
 */

utils.tableize = function tableize(obj, opts) {
  var ret = {};
  opts = opts || {};
  type(ret, obj, '', opts);
  return ret;
};

/**
 * Type `obj` recursively.
 *
 * @param {Object} schema
 * @param {Object} obj
 * @param {String} prefix
 * @api private
 */

function type(schema, obj, prefix, opts) {
  Object.keys(obj).forEach(function(key) {
    var val = obj[key];

    key = prefix + key;
    if (opts.lowercase) key = key.toLowerCase();

    if (utils.isObject(val)) {
      type(schema, val, key + '.', opts);
    } else {
      schema[key] = val;
    }
  });
}

/**
 * Expose `utils` modules
 */

module.exports = utils;
