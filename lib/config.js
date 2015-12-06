'use strict';

// require('time-require');
var path = require('path');
var utils = require('./utils');

module.exports = function(app) {
  if (!app.isVerb) return;

  /**
   * Helpers
   */

  app.config
    .map('helpers')
    .map('asyncHelpers');

  /**
   * Templates
   */

  app.config
    .map('create', function(val) {
      app.visit('create', val);
    })
    .map('includes', views('includes'))
    .map('layouts', views('layouts'))
    .map('badges', views('badges'))
    .map('docs', views('docs'));

  /**
   * Middleware
   */

  app.config
    .map('onLoad', function(fn) {
      app.onLoad(fn)
    })

  /**
   * Plugins
   */

  app.config.map('plugins', function(plugins) {
    var obj = app.get('env.argv.plugins');
    var cwd = app.get('env.user.cwd');


    for (var key in plugins) {
      var name = path.basename(key, path.extname(key));
      if (name === 'index') {
        name = path.basename(cwd);
      }

      var val = plugins[key];
      var fn;

      if (typeof val === 'function') {
        app.plugin(name, {}, val);

      } else if (typeof val === 'string') {
        fn = tryRequire(val, cwd, app.options);
        app.plugin(name, {}, fn);

      } else if (val && typeof val === 'object') {
        fn = tryRequire(key, cwd, app.options);
        app.plugin(name, val, fn);

      } else {
        var args = JSON.stringify([].slice.call(arguments));
        throw new Error('plugins configuration is not supported: ' + args);
      }
    }
  });

  // helper for loading views
  function views(name) {
    return function(options) {
      app[name](options);
    }
  }
};

function content(val) {
  return typeof val === 'string'
    ? { content: val }
    : val
}

/**
 * Try to require the given module
 * or file path.
 */

function tryRequire(name, cwd, options) {
  options = options || {};
  var attempts = [name], fp;

  try {
    return require(name);
  } catch (err) {}

  name = utils.resolveDir(name);
  try {
    return require(name);
  } catch (err) {}

  try {
    fp = path.resolve(name);
    attempts.push(fp);
    return require(fp);
  } catch (err) {}

  try {
    fp = path.resolve(utils.resolveDir(cwd), name);
    attempts.push(fp);
    return require(fp);
  } catch (err) {}

  if (options.verbose !== true) {
    return;
  }

  var msg = utils.red('[base-pipeline] cannot find plugin at: \n')
    + format(attempts)
    + utils.colors.yellow(' check your configuration to ensure plugin paths are\n'
    + ' correct (package.json config, options, etc) \n');

  throw new Error(msg);
}

function format(arr) {
  var res = '';
  arr.forEach(function(ele) {
    res += utils.colors.red(' ✖ ') + '\'' + ele + '\'' + '\n';
  });
  return res;
}
