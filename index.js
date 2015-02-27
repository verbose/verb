/*!
 * verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var diff = require('diff');
var vfs = require('vinyl-fs');
var chalk = require('chalk');
var es = require('event-stream');
var load = require('load-plugins');
var debug = require('debug')('verb');
var extend = require('extend-shallow');
var session = require('session-cache')('verb');
var Template = require('template');
var tutil = require('template-utils');
var Config = require('orchestrator');

/**
 * Local dependencies
 */

var transforms = require('./lib/transforms');
var helpers = require('./lib/helpers');
var loaders = require('./lib/loaders');
var stack = require('./lib/stack');
var utils = require('./lib/shared/utils');
var log = require('./lib/shared/logging');

/**
 * Create an instance of `Verb` with the given `options`.
 *
 * ```js
 * var verb = new Verb();
 * ```
 *
 * @param {Object} `options`
 * @constructor
 */

var Verb = module.exports = Template.extend({
  constructor: function (options) {
    Verb.__super__.constructor.call(this, options);
    Config.call(this);
    this._initialize(options && options.config);
  }
});

extend(Verb.prototype, Config.prototype);

/**
 * Initialize all configuration settings.
 *
 * @api private
 */

Verb.prototype._initialize = function(config) {
  this.fns = {};

  // first, load user environment
  this.loadEnvironment(config);

  // load extensions next
  this.loadPlugins();
  this.loadHelpers();

  // load all defaults
  this._defaultSettings();
  this._defaultConfig();
  this._defaultLoaders();
  this._defaultTransforms();
  this._defaultDelims();
  this._defaultEngines();
  this._defaultMiddleware();
  this._defaultTemplates();
  this._defaultHelpers();
  this._defaultAsyncHelpers();
};

/**
 * Load the user's environment.
 *
 * @param  {String} `config` Allow the user to optionally pass a config object when calling `new Verb()`.
 * @api private
 */

Verb.prototype.loadEnvironment = function(config) {
  debug('loading environment: %j', config);

  var env = config || require(path.resolve('package.json'));
  this.known = function (fn) {
    this.isKnown = fn.call(this, env);
    if (this.isKnown) {
      log.success('known project, using defaults.');
    }
  }.bind(this);

  /**
   * Get a stored value from `verb.env`, a read-only
   * object that stores the user-environment (mostly
   * package.json) before it's modified.
   *
   * ```js
   * console.log(verb.env.name);
   * //=> 'my-project'
   * ```
   *
   * @return {*} The value of specified property.
   * @api public
   */

  Object.defineProperty(this, 'env', {
    get: function () {
      return env;
    },
    set: function () {
      console.log('verb.env is read-only and cannot be modified.');
    }
  });
};

/**
 * Initialize default helpers.
 *
 * @api private
 */

Verb.prototype.diff = function(a, b) {
  a = a || this.env;
  b = b || this.cache.data;
  diff.diffJson(a, b).forEach(function (res) {
    var color = chalk.gray;
    if (res.added) {
      color = chalk.green;
    }
    if (res.removed) {
      color = chalk.red;
    }
    process.stderr.write(color(res.value));
  });
  console.log();
};

/**
 * Initialize default template types
 *
 * @api private
 */

Verb.prototype._defaultConfig = function() {
  this.option('cwd', process.cwd());
  this.option('base', process.cwd());
  this.option('destExt', '.md');
  this.option('config', 'package.json');
  this.option('defaults', {isRenderable: true, isPartial: true, engine: '.md', ext: '.md'});
  this.option('delims', ['{%', '%}']);
  this.option('layoutDelims', ['<<%', '%>>']);
  this.option('escapeDelims', {from: ['{%%', '%}'], to: ['{%', '%}']});
  this.option('viewEngine', '.md');
};

/**
 * Initialize default template types
 *
 * @api private
 */

Verb.prototype._defaultSettings = function() {
  this.disable('debugEngine');
  this.enable('case sensitive routing');
  this.enable('strict routing');
  this.enable('src:init plugin');
  this.enable('dest:render plugin');
  this.enable('dest:readme plugin');
  this.disable('dest:travis plugin');
  this.disable('travis badge');
};

/**
 * Register default loaders
 */

Verb.prototype._defaultLoaders = function() {
  // this.loader('helpers', loaders.helpers(this));
  // this.loader('fns', loaders.fns(this));
};

/**
 * Load default transforms. Transforms are used to extend or
 * modify the `cache.data` object, but really anything on the
 * `this` object can be tranformed.
 *
 * @api private
 */

Verb.prototype._defaultTransforms = function() {
  this.transform('init', transforms.init);
  this.transform('year', transforms.year);

  this.transform('repo', transforms.repo);
  this.transform('owner', transforms.owner);
  this.transform('nickname', transforms.nickname);
  this.transform('username', transforms.username);
  this.transform('authors', transforms.authors);
  this.transform('author', transforms.author);

  this.transform('license', transforms.license);
  this.transform('travis-file', transforms.travisfile);
  this.transform('travis-url', transforms.travis);
  this.transform('runner', transforms.runner);
};

/**
 * Load default routes / middleware
 *
 *   - `.md`: parse front matter in markdown files
 *   - `.hbs`: parse front matter in handlebars templates
 *
 * @api private
 */

Verb.prototype._defaultMiddleware = function() {
  this.onLoad(/\.js$/, tutil.parallel([
    require('./lib/middleware/copyright')
  ]));

  this.onLoad(/\.md$/, tutil.parallel([
    require('./lib/middleware/readme'),
    require('./lib/middleware/data'),
    require('./lib/middleware/ext')
  ]));

  this.preRender(/\.md$/, tutil.parallel([
    tutil.escape.escape(this)
  ]));

  this.postRender(/\.md$/, tutil.parallel([
    tutil.escape.unescape(this)
  ]));
};

/**
 * Register default template delimiters.
 *
 *   - `['{%', '%}']` => default template delimiters
 *   - `['<<%', '%>>']` => default template delimiters
 *
 * @api private
 */

Verb.prototype._defaultEngines = function() {
  this.engine('md', require('engine-lodash'));
  this.engine('*', function noop(str, opts, cb) {
    cb(null,  str);
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
 * Initialize default template types
 *
 * @api private
 */

Verb.prototype._defaultTemplates = function() {
  var opts = this.option('defaults');

  // pass a cwd to each `create()` template type
  var create = require('./lib/create/base')(this, opts);
  create('include', require('verb-readme-includes'));
  create('badge', require('verb-readme-badges'));
  create('doc', process.cwd());

  this.create('comment', opts);
  this.create('file', extend(opts, {
    renameKey: function (fp) { return fp; }
  }));
};

/**
 * Initialize default helpers.
 *
 * @api private
 */

Verb.prototype._defaultHelpers = function() {
  this.helpers(require('logging-helpers'));
  this.helpers(helpers.deprecated);

  this.helper('date', require('helper-date'));
  this.helper('license', require('helper-license'));
  this.helper('copyright', require('helper-copyright'));
  this.helper('strip', helpers.strip);
};

/**
 * Initialize async helpers.
 *
 * @api private
 */

Verb.prototype._defaultAsyncHelpers = function() {
  this.asyncHelper('resolve', require('helper-resolve'));
  this.asyncHelper('apidocs', require('helper-apidocs'));
  this.asyncHelper('comments', require('helper-apidocs'));
  this.asyncHelper('related', require('helper-related')());
  this.asyncHelper('contrib', helpers.contrib(this));
  this.asyncHelper('include', helpers.include(this));
  this.asyncHelper('badge', helpers.badge(this));
  this.asyncHelper('docs', helpers.docs(this));
};

/**
 * Load plugins. Called in the constructor to load plugins from
 * `node_modules` using the given `namespace`. You may also call
 * the method directly.
 *
 * **Example**
 *
 * The namespace `helper` will load plugins using the `helper-*` glob pattern,
 * whilst also stripping the `helper-` part from the name of each helper. In
 * other words, assuming we have a helper named `helper-lowercase`:
 *
 * ```js
 * verb.loadPlugins('helper-*');
 * //=> {lowercase: [function]}
 * ```
 *
 * @param  {String} `pattern` Optionally pass a glob pattern when calling the method directly.
 * @return {Object} Returns an object of plugins loaded from `node_modules`.
 * @api private
 */

Verb.prototype.loadPlugins = function() {
  this.loadType('async-helper', 'async');
  this.loadType('helper', 'helpers');
};

/**
 * Register helpers that are automatically loaded.
 *
 * @api private
 */

Verb.prototype.loadHelpers = function() {
  debug('loading helpers: %j', arguments);
  var name;

  var helpers = Object.keys(this.fns.helpers);
  var len = helpers.length;
  var i = 0;

  while (i < len) {
    name = helpers[i++];
    this.helper(name, this.fns.helpers[name]);
  }

  var async = Object.keys(this.fns.async);
  var alen = async.length;
  var j = 0;

  while (j < alen) {
    name = async[j++];
    this.asyncHelper(name, this.fns.async[name]);
  }
  return this;
};

/**
 * Private method to create a plugin loader for the
 * given plugin `type`, e.g. "helper"
 *
 * @param  {String} `type` The plugin type, e.g. "helper"
 * @param  {String} `collection` Plural form of `type`, e.g. "helpers"
 * @return {Object} `fns` Object of plugins, key-value pairs. The value is a function.
 * @api private
 */

Verb.prototype.loadType = function(type, collection) {
  debug('loading type: %s', type);

  this.fns[collection] = this.fns[collection] || {};
  extend(this.fns[collection], load(type + '*', {
    cwd: process.cwd(),
    strip: type
  }));

  return this.fns[collection];
};

/**
 * Convenience method for looking up a template
 * on the cache by:
 *
 *   1. `name`, as-is
 *   2. If `name` has an extension, try without it
 *   3. If `name` does not have an extension, try `name.md`
 *
 * @param {String} `collection` The collection to search.
 * @param {String} `name` The name of the template.
 * @api private
 */

Verb.prototype.lookup = function(collection, name) {
  debug('lookup [collection]: %s, [name]: %s', collection, name);

  var base = path.basename(name, path.extname(name));
  var views = this.views[collection];

  var ext = this.option('ext');
  if (ext[0] !== '.') {
    ext = '.' + ext;
  }

  if (views.hasOwnProperty(name)) {
    debug('lookup name: %s', name);
    return views[name];
  }

  if (name.indexOf('.') !== -1 && views.hasOwnProperty(base)) {
    debug('lookup base: %s', base);
    return views[base];
  }

  if (views.hasOwnProperty(name + ext)) {
    debug('lookup name + ext: %s', name + ext);
    return views[name + ext];
  }

  return null;
};

/**
 * When verb is used on a "known" project, conditionally sets values
 * on `verb.cache` or, if three arguments are passed, calls a verb
 * method passing it the rest of the arguments. This is useful if you
 * collaborate a lot on other projects and you want to be able to run
 * verb "your way" on your own projects and not worry about it messing
 * with other dev's.
 *
 * **Examples**:
 *
 * ```js
 * // only set the username to yours when, well, the repo is yours
 * verb.ifKnown('set', 'username', 'jonschlinkert');
 *
 * // use your crazy dotfile defaults when the repo is yours
 * verb.ifKnown('set', 'data.travis', {
 *   sudo: false,
 *   language: 'node_js',
 *   node_js:  ['iojs', '0.12', '0.10']
 * });
 * ```
 *
 * @param {String} `method` or `key` Optionally pass a verb method to call.
 * @param {String} `key` or `value`
 * @param {*} `value`
 * @api private
 */

Verb.prototype.ifKnown = function (method, key, value) {
  if (this.env.isKnown || this.env.name === 'verb') {
    var len = arguments.length;

    if (len === 2) {
      this.set(key, value);
      return this;
    }

    if (len === 3 && !this[method]) {
      throw new Error('verb does not have a `.' + method + '() method.');
    }

    // don't slice args for v8 optimization
    var len = arguments.length - 1;
    var args = new Array(len);

    for (var i = 0; i < len; i++) {
      args[i] = arguments[i + 1];
    }

    this[method].apply(this, args);
    return this;
  }
};

/**
 * Return true if property `key` exists on `verb.cache.data`.
 *
 * ```js
 * verb.hasData('foo');
 * ```
 *
 * @param {String} `key` The property to lookup.
 * @api public
 */

Verb.prototype.hasData = function (key) {
  return this.cache.data.hasOwnProperty(key);
};

/**
 * Run an array of tasks.
 *
 * ```js
 * verb.run(['foo', 'bar']);
 * ```
 *
 * @param {Array} `tasks`
 * @api private
 */

Verb.prototype.run = function () {
  var tasks = !arguments.length
    ? ['default']
    : arguments;
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
 * Glob patterns or filepaths to source files.
 *
 * ```js
 * verb.src('src/*.hbs', {layout: 'default'})
 * ```
 *
 * **Example usage**
 *
 * ```js
 * verb.task('site', function() {
 *   verb.src('src/*.hbs', {layout: 'default'})
 *     verb.dest('dist')
 * });
 * ```
 *
 * @param {String|Array} `glob` Glob patterns or file paths to source files.
 * @param {Object} `options` Options or locals to merge into the context and/or pass to `src` plugins
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
 * verb.dest('dist', {ext: '.xml'})
 * ```
 *
 * **Example usage**
 *
 * ```js
 * verb.task('sitemap', function() {
 *   verb.src('src/*.txt')
 *     verb.dest('dist', {ext: '.xml'})
 * });
 * ```
 *
 * @param {String|Function} `dest` File path or rename function.
 * @param {Object} `options` Options or locals to merge into the context and/or pass to `dest` plugins
 * @api public
 */

Verb.prototype.dest = function (dest, options) {
  return es.pipe.apply(es, utils.arrayify([
    stack.dest(this, dest, options),
    vfs.dest(dest, options)
  ]));
};

/**
 * Copy a `glob` of files to the specified `dest`.
 *
 * ```js
 * verb.task('assets', function() {
 *   verb.copy('assets/**', 'dist');
 * });
 * ```
 *
 * @param  {String|Array} `glob`
 * @param  {String|Function} `dest`
 * @return {Stream} Stream to allow doing additional work.
 */

Verb.prototype.copy = function(glob, dest) {
  return vfs.src(glob).pipe(vfs.dest(dest));
};

/**
 * Define a Verb task.
 *
 * ```js
 * verb.task('docs', function() {
 *   verb.src(['.verb.md', 'docs/*.md'])
 *     .pipe(verb.dest('./'));
 * });
 * ```
 *
 * @param {String} `name`
 * @param {Function} `fn`
 * @api public
 */

Verb.prototype.task = Verb.prototype.add;

/**
 * Re-run the specified task(s) when a file changes.
 *
 * ```js
 * verb.task('watch', function() {
 *   verb.watch('docs/*.md', ['docs']);
 * });
 * ```
 *
 * @param  {String|Array} `glob` Filepaths or glob patterns.
 * @param  {Function} `fn` Task(s) to watch.
 * @api public
 */

Verb.prototype.watch = function (glob, opts, fn) {
  if (Array.isArray(opts) || typeof opts === 'function') {
    fn = opts; opts = null;
  }

  if (Array.isArray(fn)) {
    return vfs.watch(glob, opts, function () {
      this.start.apply(this, fn);
    }.bind(this));
  }

  return vfs.watch(glob, opts, fn);
};

/**
 * Expose `verb.Verb`
 */

Verb.prototype.Verb = Verb;

/**
 * Expose `verb`
 */

module.exports = new Verb();
