'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Lazily required module dependencies
 */

var lazy = require('lazy-cache')(require);

// type utils
lazy('mixin-deep', 'merge');
lazy('global-modules', 'gm');
lazy('expand-tilde', 'tilde');

// file/view utils
lazy('stream-combiner', 'combine');
lazy('through2', 'through');
lazy('vinyl-fs', 'vfs');
lazy('vinyl', 'Vinyl');
lazy('to-vinyl');

// engine/template utiles
lazy('parser-front-matter', 'matter');
lazy('engine-handlebars', 'engine');

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

utils.resolveConfig = function (config, fn) {
  fn = fn || utils.identity;
  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      var val = utils.npm(resolveDir(config[key]));
      fn(key, val);
    }
  }
};

utils.layoutFn = function(app, view, cb) {
  if (app.option('layoutFn')) {
    app.options.layoutFn(view);
    return cb(null, view);
  }
  if (!view.layout) {
    view.layout = view.locals.layout;
  }
  if (!view.layout) {
    view.layout = view.data.layout;
  }
  cb(null, view);
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
 * Expose utils
 */

module.exports = utils;
