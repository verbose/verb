'use strict';

var diff = require('diff');
var chalk = require('chalk');
var extend = require('lodash')._.extend;
var Template = require('template');
var Task = require('orchestrator');
var vfs = require('vinyl-fs');

var stack = require('./lib/stack');
var init = require('./lib/init');

/**
 * Initialize `Verb`
 *
 * @param {Object} `context`
 * @api private
 */

function Verb() {
  Template.apply(this, arguments);
  Task.apply(this, arguments);
  init(this);
}

extend(Verb.prototype, Task.prototype);
Template.extend(Verb.prototype);

/**
 * Set application defaults that may be overridden by the user.
 * This is a temporary method and should not be used.
 *
 * @param {String} `key`
 * @param {*} `value`
 * @api private
 */

Verb.prototype.defaults = function(key/*, value*/) {
  if (typeof key === 'object') {
    arguments[0] = {defaults: arguments[0]};
  } else {
    arguments[0] = 'defaults.' + arguments[0];
  }
  this.option.apply(this, arguments);
  return this;
};

/**
 * Glob patterns or filepaths to source files.
 *
 * ```js
 * verb.src('src/*.hbs', {layout: 'default'})
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
 * verb.dest('dist')
 * ```
 *
 * @param {String|Function} `dest` File path or rename function.
 * @param {Object} `options` Options and locals to pass to `dest` plugins
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
 * @return {Stream} Stream, to continue processing if necessary.
 * @api public
 */

Verb.prototype.copy = function(glob, dest, opts) {
  return vfs.src(glob, opts).pipe(vfs.dest(dest, opts));
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
 * @param {String} `name` Task name
 * @param {Function} `fn`
 * @api public
 */

Verb.prototype.task = Verb.prototype.add;

/**
 * Display a visual representation of the difference between
 * two objects or strings.
 *
 * ```js
 * var doc = verb.views.docs['foo.md'];
 * verb.render(doc, function(err, content) {
 *   verb.diff(doc.orig, content);
 * });
 * ```
 *
 * @param {Object|String} `a`
 * @param {Object|String} `b`
 * @param {String} `methodName` Optionally pass a [jsdiff] method name to use. The default is `diffJson`
 * @api public
 */

Verb.prototype.diff = function(a, b, method) {
  method = method || 'diffJson';
  a = a || this.env;
  b = b || this.cache.data;
  diff[method](a, b).forEach(function (res) {
    var color = chalk.gray;
    if (res.added) {
      color = chalk.green;
    }
    if (res.removed) {
      color = chalk.red;
    }
    process.stderr.write(color(res.value));
  });
  console.log('\n');
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
  if (!Array.isArray(fn)) return vfs.watch(glob, opts, fn);
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
