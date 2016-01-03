'use strict';

var sections = require('./sections');
var updater = require('./updater');
var loader = require('./loader');
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
        throw new Error('config cannot update pkg.verb' + err);
      }
    });

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
      verb.set('cache.sections', sections.create(val, verb));
    })
    .map('includes', views('includes'))
    .map('layouts', views('layouts'))
    .map('layout', function(val) {
      if (utils.isObject(val)) {
        if (val.name) {
          var readme = verb.docs.getView('readme.md');
          readme.layout = val.name;
        }

        if (val.sections) {
          for (var key in val.sections) {
            if (val.sections.hasOwnProperty(key)) {
              var section = val.sections[key];
              verb.option('section.' + key, section);
            }
          }
        }
      }
    })
    .map('badges', views('badges'))
    .map('docs', views('docs'));

  function views(name) {
    return function(options) {
      verb[name](options);
    };
  }

  /**
   * Load helpers from verb config in `package.json`
   */

  verb.config.map('helpers', loader('helpers', verb, function(name, opts, fn) {
    name = name.slice(name.lastIndexOf('-') + 1);
    verb.helper(name, fn);
  }));

  /**
   * Load asyncHelpers from verb config in `package.json`
   */

  verb.config.map('asyncHelpers', loader('asyncHelpers', verb, function(name, opts, fn) {
    name = name.slice(name.lastIndexOf('-') + 1);
    verb.asyncHelper(name, fn);
  }));

  /**
   * Load middleware from verb config in `package.json`
   */

  verb.config.map('use', loader('middleware', verb, function(name, opts, fn) {
    // get the regex pattern to use
    var pattern = opts.pattern ? new RegExp(opts.pattern) : /./;

    // get the method name (onLoad, preWrite, preRender, etc)
    var method = opts.method || 'onLoad';
    if (!(method in verb)) {
      throw new Error('verb does not have handler: "' + method + '"');
    }
    // register the middleware
    verb[method](pattern, fn(verb.options));
  }));

  /**
   * Load plugins from verb config in `package.json`
   */

  verb.config.map('plugins', loader('plugins', verb, function(name, opts, fn) {
    verb.plugin(name, opts, fn);
  }));
};

