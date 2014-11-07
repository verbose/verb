/*!
 * verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// process.env.DEBUG = 'verb:*'

var util = require('util');
var path = require('path');
var vfs = require('vinyl-fs');
var File = require('gulp-util').File;
var es = require('event-stream');
var load = require('load-plugins');
var chalk = require('chalk');
var slice = require('array-slice');
var debug = require('debug')('verb');
var Template = require('template');
var Config = require('orchestrator');
var lodash = require('engine-lodash');
var parser = require('parser-front-matter');
var session = require('./lib/session');
var stack = require('./lib/stack');
var utils = require('./lib/utils');
var _ = require('lodash');
var extend = _.extend;


/**
 * Create an instance of `Verb` with the given `options`.
 *
 * ```js
 * var verb = new Verb();
 * ```
 *
 * @param {Object} `options`
 * @constructor
 * @api public
 */

var Verb = module.exports = Template.extend({
  constructor: function (options) {
    Verb.__super__.constructor.call(this, options);
    Config.call(this);

    this.fns = {};

    // extension must be loaded first
    this.loadPlugins();
    this.loadHelpers();

    this._defaultSettings();
    this._defaultConfig();
    this._defaultTransforms();
    this._defaultDelims();
    this._defaultTemplates();
    this._defaultRoutes();
    this._defaultMiddleware();
    this._defaultHelpers();
    this._defaultAsyncHelpers();
  }
});

extend(Verb.prototype, Config.prototype);

/**
 * Initialize default template types
 *
 * @api private
 */

Verb.prototype._defaultConfig = function() {
  this.option('viewEngine', '.md');
  this.option('destExt', '.md');
  this.option('defaults', {
    isRenderable: true,
    isPartial: true,
    engine: '.md',
    ext: '.md'
  });
};

/**
 * Initialize default template types
 *
 * @api private
 */

Verb.prototype._defaultSettings = function() {
  this.enable('debug');
  this.enable('debugEngine');

  this.enable('src:init plugin');
  this.enable('dest:render plugin');
  this.enable('dest:readme plugin');
  this.disable('dest:travis plugin');
  this.disable('travis badge');
};

/**
 * Initialize default template types
 *
 * @api private
 */

Verb.prototype._defaultTemplates = function() {
  var opts = this.option('defaults');
  this.create('doc', opts);

  var create = require('./lib/create/base')(this, opts);
  create('include', require('verb-readme-includes'));
  create('badge', require('template-badges'));

  this.create('file', extend(opts, {
    renameKey: function (fp) {
      return fp
    }
  }));
};

/**
 * Load default transforms. Transforms are used to extend or
 * modify the `cache.data` object, but really anything on the
 * `this` object can be tranformed.
 *
 * @api private
 */

Verb.prototype._defaultTransforms = function() {
  this.transform('pkg', require('./lib/transforms/pkg'));
  this.transform('author', require('./lib/transforms/author'));
  this.transform('username', require('./lib/transforms/username'));
  this.transform('travis', require('./lib/transforms/travis'));
  this.transform('runner', require('./lib/transforms/runner'));
};

/**
 * Load default middleware
 *
 * @api private
 */

Verb.prototype._defaultMiddleware = function() {
  this.use(require('./lib/middleware/ext')(this));
};

/**
 * Load default routes
 *
 * @api private
 */

Verb.prototype._defaultRoutes = function() {
  this.route(/\.md/).all(function (file, next) {
    file.data.filepath = file.path;
    next();
  });
};

/**
 * Register default template delimiters.
 *
 *   - `['{%', '%}']` => default template delimiters
 *   - `['<<%', '%>>']` => default template delimiters
 *
 * @api private
 */

Verb.prototype._defaultDelims = function() {
  this.addDelims('md', ['{%', '%}'], ['<<%', '%>>']);
};

/**
 * Initialize default helpers.
 *
 * @api private
 */

Verb.prototype._defaultHelpers = function() {
  var app = this;

  this.helper('date', require('helper-date'));
  this.helper('license', require('helper-license'));
  this.helper('copyright', require('helper-copyright'));
  this.helper('strip', require('./lib/helpers/strip'));
  this.helper('comments', require('./lib/helpers/comments'));

  this.helper('log', function (mgs) {
    console.log.apply(console, arguments);
  });

  this.helper('debug', function (mgs) {
    if (app.enabled('debug')) {
      arguments[0] = chalk.cyan(arguments[0]);
      console.log.apply(console, arguments);
    }
  });

  this.helper('info', function (msg) {
    arguments[0] = chalk.cyan(arguments[0]);
    console.log.apply(console, arguments);
  });

  this.helper('bold', function (msg) {
    arguments[0] = chalk.bold(arguments[0]);
    console.log.apply(console, arguments);
  });

  this.helper('warn', function (msg) {
    arguments[0] = chalk.yellow(arguments[0]);
    console.log.apply(console, arguments);
  });

  this.helper('error', function (msg) {
    arguments[0] = chalk.red(arguments[0]);
    console.log.apply(console, arguments);
  });
};

/**
 * Initialize async helpers.
 *
 * @api private
 */

Verb.prototype._defaultAsyncHelpers = function() {
  this.asyncHelper('include', require('./lib/helpers/include')(this));
  this.asyncHelper('badge', require('./lib/helpers/badge')(this));
  this.asyncHelper('docs', require('./lib/helpers/docs')(this));
};

/**
 * Load plugins. Called in the constructor to load plugins from
 * `node_modules` using the given `namespace`. You may also call
 * the method directly.
 *
 * **Example**
 *
 * Namespace `foo` would load plugins using the
 * `foo-*` glob pattern, e.g:
 *
 * ```js
 * verb.loadPlugins('foo-*');
 * ```
 *
 * @param  {String} `pattern` Optionally pass a glob pattern when calling the method directly.
 * @return {Object} Returns an object of plugins loaded from `node_modules`.
 * @api private
 */

Verb.prototype.loadPlugins = function() {
  this.loadType('plugin', 'plugins');
  this.loadType('helper', 'helpers');
  this.loadType('tag', 'tags');
};

/**
 * Register helpers that are automatically loaded.
 *
 * @api private
 */

Verb.prototype.loadHelpers = function() {
  var helpers = Object.keys(this.fns.helpers);
  var len = helpers.length;
  for (var i = 0; i < len; i++) {
    var name = helpers[i];
    var fn = this.fns.helpers[name];
    this.asyncHelper(name, fn);
    this.helper(name, fn);
  }
  return this;
};

/**
 * Private method to create a plugin loader for the
 * given plugin `type`, e.g. "helper"
 *
 * @param  {String} `type` The plugin type, e.g. "helper"
 * @param  {String} `plural` Plural form of `type`, e.g. "helpers"
 * @return {Object} `fns` Object of plugins, key-value pairs. The value is a function.
 */

Verb.prototype.loadType = function(type, plural) {
  this.fns[plural] = this.fns[plural] || {};
  extend(this.fns[plural], load('verb-' + type + '*', {
    strip: 'verb-' + type,
    cwd: process.cwd()
  }));
  return this.fns[plural];
};

/**
 * Convenience method for looking up a template
 * on the cache.
 *
 * @param {String} `plural` The template cache to search.
 * @param {String} `name` The name of the template.
 * @api public
 */

Verb.prototype.lookup = function(plural, name) {
  var cache = this.cache[plural];

  if (cache.hasOwnProperty(name)) {
    return cache[name];
  }

  if (cache.hasOwnProperty(name + '.md')) {
    return cache[name + '.md'];
  }

  return name;
};

/**
 * Define a Verb task.
 *
 * ```js
 * verb.task('docs', function() {
 *   // do stuff
 * });
 * ```
 *
 * @param {String} `name`
 * @param {Function} `fn`
 * @api public
 */

Verb.prototype.task = Verb.prototype.add;

/**
 * Run an array of tasks.
 *
 * ```js
 * verb.run(['foo', 'bar']);
 * ```
 *
 * @param {Array} `tasks`
 * @api public
 */

Verb.prototype.run = function () {
  var tasks = arguments.length ? arguments : ['default'];
  this.start.apply(this, tasks);
};

/**
 * Wrapper around Config._runTask to enable `sessions`
 *
 * @param  {Object} `task` Task to run
 * @api private
 */

Verb.prototype._runTask = function(task) {
  var verb = this;
  session.run(function () {
    session.set('task_name', task.name);
    Config.prototype._runTask.call(verb, task);
  });
};

/**
 * Transform `value` to a vinyl file.
 *
 * @param  {Object} `value`
 * @return {Object} Returns a vinyl file.
 * @api public
 */

Verb.prototype.toVinyl = function(value) {
  var file = new File({
    contents: new Buffer(value.content),
    path: value.path,
  });

  file.options = value.options || (value.options = {});
  file.locals = value.locals || (value.locals = {});
  file.data = value.data || (value.data = {});
  file.ext = value.ext;
  return file;
};

/**
 * Glob patterns or filepaths to source files.
 *
 * ```js
 * verb.task('site', function() {
 *   verb.src('src/*.hbs', {layout: 'default'})
 *     verb.dest('dist')
 * });
 * ```
 *
 * @param {String|Array} `glob`
 * @param {Object} `options`
 * @api public
 */

Verb.prototype.src = function (glob, options) {
  return es.pipe.apply(es, utils.arrayify([
    vfs.src(glob, options),
    stack.src(this, glob, options)
  ]));
};

/**
 * Specify a destination for processed files.
 *
 * ```js
 * verb.task('sitemap', function() {
 *   verb.src('src/*.txt')
 *     verb.dest('dist', {ext: '.xml'})
 * });
 * ```
 * @param {String|Array|Function} `patterns` Glob patterns, file paths, or renaming function.
 * @param {Object} `opts` Options to be passed to `dest` plugins.
 * @api public
 */

Verb.prototype.dest = function (dest, options) {
  return es.pipe.apply(es, utils.arrayify([
    stack.dest(this, dest, options),
    vfs.dest(dest, options)
  ]));
};

/**
 * Rerun the specified task when a file changes.
 *
 * ```js
 * verb.task('watch', function() {
 *   verb.watch('docs/*.md', ['docs']);
 * });
 * ```
 *
 * @param  {String|Array} `glob` Filepaths or glob patterns.
 * @param  {String} `options`
 * @param  {Function} `fn` Task(s) to watch.
 * @api public
 */

Verb.prototype.watch = function (glob, opts, fn) {
  if (Array.isArray(opts) || typeof opts === 'function') {
    fn = opts;
    opts = null;
  }

  if (Array.isArray(fn)) {
    return vfs.watch(glob, opts, function () {
      this.start.apply(this, fn);
    }.bind(this));
  }
  return vfs.watch(glob, opts, fn);
};

/**
 * Un-buffer the contents of a template.
 *
 * @api private
 */

function unBuffer(value) {
  if (value == null) {
    return {};
  }

  if (!Buffer.isBuffer(value.contents)) {
    return value;
  }

  value.content = value.contents.toString('utf8');
  var o = {};

  for (var key in value) {
    if (['contents', '_contents'].indexOf(key) === -1) {
      o[key] = value[key];
    }
  }
  return o;
}

/**
 * Expose `verb.Verb`
 */

Verb.prototype.Verb = Verb;

/**
 * Expose `verb`
 */

module.exports = new Verb();
