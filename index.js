'use strict';

var diff = require('diff');
var chalk = require('chalk');
var extend = require('lodash').extend;
var Template = require('template');
var Task = require('orchestrator');
var vfs = require('vinyl-fs');

/* deps: template */
var session = require('./lib/session');
var stack = require('./lib/stack');
var utils = require('./lib/utils/');
var init = require('./lib/init/');

/**
 * Initialize `Verb`
 *
 * @param {Object} `context`
 * @api private
 */

function Verb() {
  Template.apply(this, arguments);
  Task.apply(this, arguments);
  this.session = session;
  init(this);
}

extend(Verb.prototype, Task.prototype);
Template.extend(Verb.prototype);

/**
 * Display a visual representation of the
 * difference between `a` and `b`
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
 * Run an array of tasks.
 *
 * ```js
 * verb.run(['foo', 'bar']);
 * ```
 *
 * @param {Array} `tasks`
 * @api private
 */

Verb.prototype.run = function() {
  var tasks = arguments.length ? arguments : ['default'];
  this.start.apply(this, tasks);
};

/**
 * Wrapper around Task._runTask to enable `sessions`
 *
 * @param  {Object} `task` Task to run
 * @api private
 */

Verb.prototype._runTask = function(task) {
  var verb = this;
  verb.session.run(function () {
    verb.session.set('task', task.name);
    Task.prototype._runTask.call(verb, task);
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

Verb.prototype.src = function(glob, opts) {
  return stack.src(this, glob, opts);
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

Verb.prototype.dest = function(dest, opts) {
  return stack.dest(this, dest, opts);
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
 * The `files` property is session-context-specific
 * and returns the `files` collection being used in
 * the current `task`.
 *
 * @name assemble.files
 * @return {Object} Template files from current task.
 * @api public
 */

// Object.defineProperty(Verb.prototype, 'files', {
//   configurable: true,
//   enumerable: true,
//   get: function () {
//     var plural = this.inflections[this.gettask()];
//     return this.views[plural];
//   }
// });

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
 * Get the id from the current task.
 *
 * ```js
 * verb.gettask();
 * ```
 *
 * @return {String} `task` The currently running task.
 * @api public
 */

Verb.prototype.gettask = function() {
  var name = this.session.get('task');
  return typeof name != 'undefined'
    ? 'task_' + name
    : 'doc';
};

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

Verb.prototype.watch = function(glob, opts, fn) {
  if (Array.isArray(opts) || typeof opts === 'function') {
    fn = opts; opts = null;
  }

  if (!Array.isArray(fn)) vfs.watch(glob, opts, fn);
  return vfs.watch(glob, opts, function () {
    this.start.apply(this, fn);
  }.bind(this));
};

/**
 * Expose `verb.Verb`
 */

Verb.prototype.Verb = Verb;

/**
 * Expose `verb`
 */

module.exports = new Verb();
