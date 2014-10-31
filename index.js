/*!
 * verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// process.env.DEBUG = 'verb:*'

var util = require('util');
var vfs = require('vinyl-fs');
var File = require('gulp-util').File;
var es = require('event-stream');
var load = require('load-plugins');
var slice = require('array-slice');
var debug = require('debug')('verb');
var Engine = require('engine');
var Config = require('orchestrator');
var parser = require('parser-front-matter');
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

var Verb = module.exports = Engine.extend({
  constructor: function (options) {
    Verb.__super__.constructor.call(this, options);
    Config.call(this);

    this.fns = {};

    this._loadExtensions();
    this._defaultConfig();
    this._defaultTemplates();
    this._defaultHelpers();
    this._defaultRoutes();
    this._loadHelpers();
  }
});

// util.inherits(Verb, Engine);
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

Verb.prototype.defaultPlugins = function() {
  this.enable('src:routes');
  this.enable('src:extend');
  this.enable('dest:path');
  this.enable('dest:extend');
  this.enable('dest:routes');
  this.enable('dest:render');
};

/**
 * Initialize default template types
 *
 * @api private
 */

Verb.prototype._defaultTemplates = function() {
  this.create('doc', this.option('defaults'));
  this.create('include', this.option('defaults'));
  this.create('file', extend(this.option('defaults'), {
    renameKey: function (fp) {
      return fp
    }
  }));
};

/**
 * Load default middleware
 *
 *   - `.md`: parse front matter in markdown files
 *   - `.hbs`: parse front matter in handlebars templates
 *
 * @api private
 */

Verb.prototype._defaultRoutes = function() {
  this.route(/\.*$/, function (file, next) {
    parser.parse(file, function (err) {
      if (err) return next(err);
      next();
    });
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

Verb.prototype.defaultDelimiters = function() {
  this.addDelims('md', ['{%', '%}'], ['<<%', '%>>']);
};

/**
 * Load plugins.
 *
 * Called in the constructor to load plugins from `node_modules`
 * using the given `namespace`, but you may also call the method
 * directly.
 *
 * For example, the namespace `foo` would load plugins using the
 * `foo-*` glob pattern, e.g:
 *
 * ```js
 * verb.loadPlugins('foo-*');
 * ```
 *
 * @param  {String} `pattern` Optionally pass a glob pattern when calling the method directly.
 * @return {Object} Returns an object of plugins loaded from `node_modules`.
 * @api public
 */

Verb.prototype._loadExtensions = function(pattern) {
  this.loadType('plugin', 'plugins', pattern);
  this.loadType('helper', 'helpers', pattern);
  this.loadType('tag', 'tags', pattern);
};

/**
 * Initialize default helpers.
 *
 * @api private
 */

Verb.prototype._defaultHelpers = function() {
  this.addHelperAsync('docs', function (name, locals, cb) {
    var doc = this.cache.docs[name];
    this.render(doc, locals, function (err, content) {
      if (err) return cb(err);
      cb(null, content);
    });
  });
};

/**
 * Register helpers that are automatically loaded.
 *
 * @api private
 */

Verb.prototype._loadHelpers = function() {
  var helpers = Object.keys(this.fns.helpers);
  var len = helpers.length;

  for (var i = 0; i < len; i++) {
    var name = helpers[i];
    var fn = this.fns.helpers[name];
    this.addHelperAsync(name, fn);
  }
  return this;
};

/**
 * Private method to create a plugin loader for the
 * given `type`.
 *
 * @param  {String} `type`
 * @param  {String} `plural`
 * @param  {String} `pattern`
 * @return {Object} `fns`
 */

Verb.prototype.loadType = function(type, plural, pattern) {
  this.fns[plural] = this.fns[plural] || {};
  extend(this.fns[plural], load(namify(type) + '*', {
    strip: namify(type),
    cwd: process.cwd()
  }));
  return this.fns[plural];
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
 * Private method to make a `verb-` name`.
 *
 * @param  {String} `str`
 * @return {String}
 */

function namify(str) {
  return 'verb-' + str;
}

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
