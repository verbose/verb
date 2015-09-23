'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Lazily required module dependencies
 */

var lazy = require('lazy-cache')(require);

// type utils
lazy('mixin-deep', 'merge');

// file/view utils
lazy('stream-combiner', 'combine');
lazy('through2', 'through');
lazy('vinyl-fs', 'vfs');
lazy('vinyl', 'Vinyl');
lazy('to-vinyl');

// engine/template utiles
lazy('parser-front-matter', 'matter');
lazy('engine-handlebars', 'engine');
lazy('question-cache', 'questions');
lazy('ask-once', 'ask');

// task utils
lazy('composer-runtimes');
lazy('src-stream');
lazy('dest');

var utils = lazy;

utils.runtimes = function(app) {
  if (app.options.runtimes !== false) {
    utils.composerRuntimes(app);
  }
};

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
  return utils.tryRequire(name) || utils.tryRequire(path.resolve(name));
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

utils.reloadViews = function reloadViews(app, key) {
  for (var name in app.views) {
    if (app.views.hasOwnProperty(name)) {
      var views = app.views[name];

      if (!key || typeof app[name][key] !== 'function') {
        app.create(name, app[name].options);
        app[name].addViews(views);
      }
    }
  }
};

/**
 * Override the native `getView` method from `templates`
 * with a custom method that calls `loadView` if the
 * view isn't already cached.
 */

utils.getView = function (options) {
  return function (app) {
    return function (collection) {
      if (!collection.isCollection) return collection;
      var fn = this.getView;

      this.getView = function (name) {
        return fn.apply(this, arguments) || this.loadView(name, {
          ext: '.md'
        });
      };
      return this;
    };
  };
};

/**
 * Expose utils
 */

module.exports = utils;
