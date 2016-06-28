'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-runner', 'runner');
require('config-file');
require('extend-shallow', 'extend');
require('fs-exists-sync', 'exists');
require('generate');
require('get-value', 'get');
require('gulp-format-md', 'format');
require('log-utils', 'log');
require('reflinks');
require('set-value', 'set');
require('through2', 'through');
require('yargs-parser', 'yargs');
require = fn;

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

utils.logger = function(prop, color) {
  color = color || 'dim';
  return function(msg) {
    var rest = [].slice.call(arguments, 1);
    return console.log
      .bind(console, utils.log.timestamp, utils.log[prop])
      .apply(console, [utils.log[color](msg), ...rest]);
  };
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
