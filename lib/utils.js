'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;
var stores = {};

/**
 * Lazily required module dependencies
 */

require('base-runner', 'runner');
require('common-middleware', 'middleware');
require('config-file');
require('data-store', 'DataStore');
require('extend-shallow', 'extend');
require('fs-exists-sync', 'exists');
require('generate');
require('get-value', 'get');
require('global-modules', 'gm');
require('gulp-format-md', 'format');
require('gulp-reflinks', 'reflinks');
require('kind-of', 'typeOf');
require('log-utils', 'log');
require('macro-store', 'MacroStore');
require('merge-deep', 'merge');
require('object.pick', 'pick');
require('set-value', 'set');
require('strip-color', 'strip');
require('text-table', 'table');
require('through2', 'through');
require('yargs-parser', 'parse');
require = fn;

/**
 * Format a value to be displayed in the command line
 */

utils.formatValue = function(val) {
  return utils.cyan(util.inspect(val, null, 10));
};

/**
 * Return true if a value is an object.
 */

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object';
};

/**
 * Returns true if `val` is true or is an object with `show: true`
 *
 * @param {String} `val`
 * @return {Boolean}
 */

utils.show = function(val) {
  return utils.isObject(val) && val.show === true;
};

/**
 * Initialize stores
 */

utils.stores = function(proto) {
  // create `macros` store
  Object.defineProperty(proto, 'macros', {
    configurable: true,
    set: function(val) {
      stores.macros = val;
    },
    get: function() {
      return stores.macros || (stores.macros = new utils.MacroStore({name: 'verb-macros'}));
    }
  });

  // create `app.globals` store
  Object.defineProperty(proto, 'globals', {
    configurable: true,
    set: function(val) {
      stores.globals = val;
    },
    get: function() {
      return stores.globals || (stores.globals = new utils.DataStore('verb-globals'));
    }
  });
};

/**
 * argv options
 */

utils.opts = {
  boolean: ['diff'],
  alias: {
    add: 'a',
    config: 'c',
    configfile: 'f',
    diff: 'diffOnly',
    global: 'g',
    help: 'h',
    silent: 'S',
    verbose: 'v',
    version: 'V',
    remove: 'r'
  }
};

utils.parseArgs = function(argv) {
  var obj = utils.parse(argv, utils.opts);
  if (obj.init) {
    obj._.push('init');
    delete obj.init;
  }
  if (obj.help) {
    obj._.push('help');
    delete obj.help;
  }
  return obj;
};

utils.getConfig = function(app, name) {
  var runtimeConfig = path.resolve(app.cwd, name);
  var config = utils.configFile('.verbrc.json') || {};

  if (utils.exists(runtimeConfig)) {
    var rc = JSON.parse(fs.readFileSync(runtimeConfig, 'utf8'));
    config = utils.extend({}, config, rc);
    app.base.set('cache.config', config);
  }
};

utils.getTasks = function(configFile, arrays) {
  arrays = utils.arrayify(arrays);
  var tasks = [];

  if (configFile) {
    tasks = utils.arrayify(arrays[0]);
    return tasks.length >= 1 ? tasks : ['default'];
  }

  for (var i = 0; i < arrays.length; i++) {
    var arr = utils.arrayify(arrays[i]);
    // if `default` task is defined, continue
    if (arr.length === 1 && arr[0] === 'default') {
      continue;
    }
    // if nothing is defined, continue
    if (arr.length === 0) {
      continue;
    }
    tasks = arr;
    break;
  }
  return tasks;
};

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

utils.firstIndex = function(arr, items) {
  items = utils.arrayify(items);
  var idx = -1;
  for (var i = 0; i < arr.length; i++) {
    if (items.indexOf(arr[i]) !== -1) {
      idx = i;
      break;
    }
  }
  return idx;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
