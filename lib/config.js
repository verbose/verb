'use strict';

var fs = require('fs');
var path = require('path');
var sections = require('./runner/sections');
var updater = require('./updater');
var utils = require('./utils');

module.exports = function(verb, base, env) {
  verb.use(updater());

  /**
   * Update verb config (`verb` object in package.json)
   *
   * * `--init`: force verb to init a project
   * * `--data`: add or extend verb config data to be used in templates
   * * `--update`: this mapping is setup to be called by the cli `--config`
   *   command, and is used to extend, add, delete or otherwise update
   *   any given property on the config object
   */

  verb.config
    .map('init', function(val) {
      if (val === true) {
        verb.enable('init');
      }
    })
    .map('options', function(options) {
      for (var key in options) {
        var val = options[key];
      }
    })
    .map('option', function(val) {
      verb.option(val);
    })
    .map('update', function(val) {
      verb.emit('config.update', val);
      env = env || verb.env;

      var file = verb.docs.getView('package.json');
      if (!file || !file.json) return;

      var pkg = env.user.pkg;
      if (!pkg) return;

      pkg.verb = pkg.verb || {};
      try {
        file.json.verb = verb.update(pkg.verb, val);
        verb.set('cache.config', file.json.verb);
      } catch (err) {
        throw new Error('config', 'cannot update pkg.verb', err);
      }
    });

  /**
   * Helpers
   */

  verb.config
    .map('helpers', function(val) {
      console.log('helpers >', val);
    })
    .map('asyncHelpers');

  /**
   * Template options and settings
   */

  verb.config
    .map('toc', function(val) {
      verb.option('toc', val);
    })
    .map('create', function(val) {
      verb.visit('create', val);
    });

  /**
   * Load templates
   */

  verb.config
    .map('sections', function(val) {
      verb.set('cache.sections', sections(val, verb));
    })
    .map('includes', views('includes'))
    .map('layouts', views('layouts'))
    .map('badges', views('badges'))
    .map('docs', views('docs'));

  function views(name) {
    return function(options) {
      verb[name](options);
    };
  }

  /**
   * Helpers
   */

  verb.config.map('helpers', function(helpers) {
    var obj = verb.get('env.argv.helpers');
    var cwd = verb.get('env.user.cwd');
    var opts = {};

    if (typeof helpers === 'string') {
      helpers = [helpers];
    }

    if (Array.isArray(helpers)) {
      helpers = helpers.reduce(function(acc, helper) {
        if (typeof helper === 'string') {
          acc[helper] = {};
        } else {
          throw new Error('helper format not supported, implement me!');
        }
        return acc;
      }, {});
    }

    for (var key in helpers) {
      var name = path.basename(key, path.extname(key));
      var helper = helpers[key];

      try {
        if (name === 'index') {
          var dir = path.resolve(cwd);
          var fp = utils.tryResolve(dir);
          if (fs.existsSync(fp)) {
            opts = helper;
            helper = utils.tryRequire(fp);
            name = path.basename(dir);
          }
        }
      } catch (err) {
        throw err;
      }

      if (typeof helper === 'string') {
        // use `name`
        // resolve `helper`

      } else if (utils.isObject(helper)) {
        opts = helper;
        helper = utils.loadModule(opts.path || name);
        name = opts.name || name;
      }

      if (typeof helper !== 'function') {
        throw new Error('cannot load helper: ' + helper);
      }

      verb.helper(name, opts, helper);
    }
  });

  /**
   * Middleware
   */

  verb.config.map('use', function(middleware) {
    var obj = verb.get('env.argv.middleware');
    var cwd = verb.get('env.user.cwd');
    var opts = {};

    if (typeof middleware === 'string') {
      middleware = [middleware];
    }

    if (Array.isArray(middleware)) {
      middleware = middleware.reduce(function(acc, val) {
        if (typeof val === 'string') {
          acc[val] = {};
        } else {
          throw new Error('format not supported, implement me!');
        }
        return acc;
      }, {});
    }

    for (var key in middleware) {
      var name = path.basename(key, path.extname(key));
      var val = middleware[key];

      if (name === 'index') {
        var dir = path.resolve(cwd);
        var fp = utils.tryResolve(dir);
        if (fs.existsSync(fp)) {
          opts = val;
          val = utils.tryRequire(fp);
          name = path.basename(dir);
        }
      }

      if (typeof val === 'string') {
        throw new Error('format not supported, implement me!');

      } else if (utils.isObject(val)) {
        opts = val;
        var fp = utils.resolveModule(opts.path || name);
        if (opts.path) {
          fp = path.resolve(path.dirname(fp), opts.path);
        }
        val = utils.tryRequire(fp);
        name = opts.name || name;
      }

      if (typeof val !== 'function') {
        throw new Error('cannot load middleware: ' + val);
      }

      // get the regex pattern to use
      var pattern = opts.pattern ? new RegExp(opts.pattern) : /./;

      // get the method name (onLoad, preWrite, preRender, etc)
      var method = opts.method || 'onLoad';
      if (!(method in verb)) {
        throw new Error('verb does not have a middleware handler for ' + method);
      }

      // load the middleware
      verb[method](pattern, val(verb.options));
    }
  });

  verb.config.map('plugins', function(plugins) {
    var obj = verb.get('env.argv.plugins');
    var cwd = verb.get('env.user.cwd');
    var opts = {};

    if (typeof plugins === 'string') {
      plugins = [plugins];
    }

    if (Array.isArray(plugins)) {
      plugins = plugins.reduce(function(acc, plugin) {
        if (typeof plugin === 'string') {
          acc[plugin] = {};
        } else {
          throw new Error('plugin format not supported, implement me!');
        }
        return acc;
      }, {});
    }

    for (var key in plugins) {
      var name = path.basename(key, path.extname(key));
      var plugin = plugins[key];

      try {
        if (name === 'index') {
          var dir = path.resolve(cwd);
          var fp = utils.tryResolve(dir);
          if (fs.existsSync(fp)) {
            opts = plugin;
            plugin = utils.tryRequire(fp);
            name = path.basename(dir);
          }
        }
      } catch (err) {
        throw err;
      }

      if (typeof plugin === 'string') {
        // use `name`
        // resolve `plugin`

      } else if (utils.isObject(plugin)) {
        opts = plugin;
        plugin = utils.loadModule(opts.path || name);
        name = opts.name || name;
      }

      if (typeof plugin !== 'function') {
        throw new Error('cannot load plugin: ' + plugin);
      }

      verb.plugin(name, opts, plugin);
    }
  });
};
