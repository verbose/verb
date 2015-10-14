'use strict';

/**
 * module dependencies
 */

var path = require('path');
var store = require('data-store');
// var Assemble = require('assemble');
var Templates = require('templates');
var Composer = require('composer');
var proto = Composer.prototype;
var plugin = require('./lib/plugins');
var lib = require('./lib');
var Locals = lib.locals;
var utils = lib.utils;

/**
 * Create an `verb` application. This is the main function exported
 * by the verb module.
 *
 * ```js
 * var verb = require('verb');
 * var app = verb();
 * ```
 * @param {Object} `options` Optionally pass default options to use.
 * @api public
 */

function Verb(options) {
  if (!(this instanceof Verb)) {
    return new Verb(options);
  }
  Templates.apply(this, arguments);
  Composer.apply(this, arguments);
  this.options = options || {};
  this.initVerb(this.options);
}

Templates.inherit(Verb, Composer);

/**
 * `Verb` prototype methods
 */

Templates.extend(Verb, {
  constructor: Verb,

  /**
   * Initialize Verb defaults
   */

  initVerb: function(opts) {
    this.use(plugin.collections());
    this.use(plugin.questions());

    this.initEngines(this);
    this.initMiddleware(this);
    this.initListeners(this);
    lib.helpers(this);

    this.store = store('verb', opts.store);
    this.locals = new Locals('verb', this);
    lib.config(this);
  },

  initListeners: function (app) {
    this.on('option', function (key) {
      utils.reloadViews(app, key);
    });

    this.on('use', function () {
      utils.reloadViews(app);
    });
  },

  /**
   * Default template engines
   */

  initEngines: function () {
    this.option('rethrow', { regex: /\{%=?([^%]*)%}/ });
    this.engine('md', require('engine-base'), {
      delims: ['{%', '%}']
    });
  },

  /**
     * Default middleware for parsing front matter
   */

  initMiddleware: function (app) {
    this.onLoad(/\.md$/, function (view, next) {
      utils.matter.parse(view, next);
    });
  },

  /**
   * Glob patterns or filepaths to source files.
   *
   * ```js
   * app.src('src/*.hbs', {layout: 'default'});
   * ```
   * @name .src
   * @param {String|Array} `glob` Glob patterns or file paths to source files.
   * @param {Object} `options` Options or locals to merge into the context and/or pass to `src` plugins
   * @api public
   */

  src: function () {
    return utils.vfs.src.apply(utils.vfs, arguments);
  },

  /**
   * Glob patterns or paths for symlinks.
   *
   * ```js
   * app.symlink('src/**');
   * ```
   * @name .symlink
   * @param {String|Array} `glob`
   * @api public
   */

  symlink: function () {
    return utils.vfs.symlink.apply(utils.vfs, arguments);
  },

  /**
   * Specify a destination for processed files.
   *
   * ```js
   * app.dest('dist/');
   * ```
   * @name .dest
   * @param {String|Function} `dest` File path or rename function.
   * @param {Object} `options` Options and locals to pass to `dest` plugins
   * @api public
   */

  dest: function (dest) {
    if (!dest) throw new Error('expected dest to be a string or function.');
    return utils.vfs.dest.apply(utils.vfs, arguments);
  },

  /**
   * Copy files with the given glob `patterns` to the specified `dest`.
   *
   * ```js
   * app.task('assets', function() {
   *   app.copy('assets/**', 'dist/');
   * });
   * ```
   * @name .copy
   * @param {String|Array} `patterns` Glob patterns of files to copy.
   * @param  {String|Function} `dest` Desination directory.
   * @return {Stream} Stream, to continue processing if necessary.
   * @api public
   */

  copy: function(patterns, dest, options) {
    return utils.vfs.src(patterns, options)
      .pipe(utils.vfs.dest(dest, options));
  },

  /**
   * Push a view collection into a vinyl stream.
   *
   * ```js
   * app.toStream('posts', function(file) {
   *   return file.path !== 'index.hbs';
   * })
   * ```
   * @name .toStream
   * @param {String} `collection` The name of the view collection to push into the stream.
   * @param {Function} Optionally pass a filter function to use for filtering views.
   * @return {Stream}
   * @api public
   */

  toStream: function (name) {
    var views = this.getViews(name) || {};
    var stream = utils.through.obj();
    setImmediate(function () {
      Object.keys(views).forEach(function (key) {
        stream.write(views[key]);
      });
      stream.end();
    });
    return utils.srcStream(stream);
  },

  /**
   * Render a vinyl file.
   *
   * ```js
   * app.src('*.hbs')
   *   .pipe(app.renderFile());
   * ```
   *
   * @name .renderFile
   * @param  {Object} `locals` Optionally locals to pass to the template engine for rendering.
   * @return {Object}
   * @api public
   */

  renderFile: function (locals) {
    var app = this;
    var collection = this.collection();
    return utils.through.obj(function (file, enc, cb) {
      if (typeof locals === 'function') {
        cb = locals;
        locals = {};
      }

      var view = collection.setView(file);
      app.handleView('onLoad', view);

      var ctx = utils.merge({}, app.cache.data, locals, view.data);
      app.render(view, ctx, function (err, res) {
        if (err) return cb(err);
        file = new utils.Vinyl(res);
        cb(null, file);
      });
    });
  },

  /**
   * Define a task to be run when the task is called.
   *
   * ```js
   * app.task('default', function() {
   *   app.src('templates/*.hbs')
   *     .pipe(app.dest('dist/'));
   * });
   * ```
   * @name .task
   * @param {String} `name` Task name
   * @param {Function} `fn` function that is called when the task is run.
   * @api public
   */

  task: function (/*name*/) {
    utils.runtimes(this);
    return proto.task.apply(this, arguments);
  },

  /**
   * Run one or more tasks.
   *
   * ```js
   * app.run(['foo', 'bar'], function(err) {
   *   if (err) console.error('ERROR:', err);
   * });
   * ```
   * @name .run
   * @param {Array|String} `tasks` Task name or array of task names.
   * @param {Function} `cb` callback function that exposes `err`
   * @api public
   */

  run: function (/*tasks, cb*/) {
    return proto.run.apply(this, arguments);
  },

  /**
   * Re-run the specified task(s) when a file changes.
   *
   * ```js
   * app.task('watch', function() {
   *   app.watch('docs/*.md', ['docs']);
   * });
   * ```
   *
   * @param  {String|Array} `glob` Filepaths or glob patterns.
   * @param  {Array} `tasks` Task(s) to watch.
   * @api public
   */

  watch: function (/*glob, tasks*/) {
    return proto.watch.apply(this, arguments);
  }
});

/**
 * Expose the `Verb` constructor
 */

module.exports = Verb;
