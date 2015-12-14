'use strict';

var fs = require('fs');
var path = require('path');
var updater = require('./updater');
var utils = require('./utils');

module.exports = function(verb, base, env) {
  // if (!verb.isVerb) return;
  verb.use(updater());

  verb.config
    .map('init', function(val) {
      if (val === true) {
        verb.enable('init');
      }
    })
    .map('option')
    .map('update', function(obj) {
      var view = verb.docs.getView('package.json');
      if (!view) return;

      var pkg = env.user.pkg;
      if (!pkg) return;

      try {
        pkg.verb = pkg.verb || {};
        verb.update(pkg.verb, obj);
        view.json = pkg;
      } catch (err) {
        new verb.VerbError('config', 'cannot update pkg.verb', err);
      }
    });

  /**
   * Helpers
   */

  verb.config
    .map('helpers')
    .map('asyncHelpers');

  /**
   * Templates
   */

  verb.config
    .map('sections', function(val) {
      console.log(val)
    })
    .map('create', function(val) {
      verb.visit('create', val);
    })
    .map('includes', views('includes'))
    .map('layouts', views('layouts'))
    .map('badges', views('badges'))
    .map('docs', views('docs'));

  /**
   * Middleware
   */

  // verb.config
  //   .map('onLoad', function(fn) {
  //     verb.onLoad(fn);
  //   });

  /**
   * Plugins
   */

  verb.config.map('plugins', function(plugins) {
    var obj = verb.get('env.argv.plugins');
    var cwd = verb.get('env.user.cwd');
    var opts = {};

    if (typeof plugins === 'string') {
      plugins = [plugins];
    }

    if (Array.isArray(plugins)) {
      plugins = plugins.reduce(function(acc, plugin) {
        acc[plugin] = {};
        return acc;
      }, {});
    }

    for (var key in plugins) {
      var name = path.basename(key, path.extname(key));
      var plugin = plugins[key];

      if (name === 'index') {
        var dir = path.resolve(cwd);
        var fp = utils.tryResolve(dir);
        if (fs.existsSync(fp)) {
          opts = plugin;
          plugin = utils.tryRequire(fp);
          name = path.basename(dir);
        }
      }

      if (typeof plugin === 'string') {
        // use `name`
        // resolve `plugin`

      } else if (utils.isObject(plugin)) {
        opts = plugin;
        plugin = utils.loadModule(name);
        name = opts.name || name;
      }

      if (typeof plugin !== 'function') {
        throw new Error('cannot load plugin: ' + plugin);
      }
      verb.plugin(name, opts, plugin);
    }
  });

  // helper for loading views
  function views(name) {
    return function(options) {
      verb[name](options);
    };
  }
};

// function loadPlugin(verb, name, plugin) {
//   if (typeof plugin === 'function') {
//     verb.plugin(name, {}, plugin);
//     return true;
//   }
//   var fn;
//   if (typeof plugin === 'string') {
//     fn = tryRequire(plugin, cwd, verb.options);
//     verb.plugin(name, {}, fn);
//     return true;
//   }
//   if (utils.isObject(plugin)) {
//     fn = tryRequire(key, cwd, verb.options);
//     verb.plugin(name, plugin, fn);
//     return true;
//   }
//   return false;
// }

function content(val) {
  return typeof val === 'string'
    ? { content: val }
    : val;
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
