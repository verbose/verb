'use strict';

var async = require('async');
var Assemble = require('assemble-core');
var templates = require('./lib/templates');
var defaults = require('./lib/defaults');
var config = require('./lib/config');
var utils = require('./lib/utils');
var cli = require('./lib/cli');

/**
 * Create an instance of `Verb` with the given `options`
 *
 * ```js
 * var Verb = require('verb');
 * var verb = new Verb(options);
 * ```
 * @param {Object} `options` Configuration options to initialize with.
 * @api public
 */

function Verb(options) {
  if (!(this instanceof Verb)) {
    return new Verb(options);
  }

  Assemble.apply(this, arguments);
  this.name = this.options.name || 'base';
  this.isVerb = true;
  this.verbApps = {};

  var opts = this.options;
  this.use(utils.middleware(opts))
    .use(utils.pipeline(opts))
    .use(utils.config())
    .use(utils.loader())
    .use(utils.store())
    .use(templates())
    .use(utils.ask())

  config(this);
  cli(this);

  this.engine(['md', 'text'], require('engine-base'), {
    delims: ['{%', '%}']
  });

  this.on('prebuild', function(name, task, app) {
    var pkg = app.get('env.user.pkg') || {};
    app.config.process(pkg.verb);
  });

  this.on('register', function(name, app) {
    // bubble up errors to `base` instance
    defaults(app, app.base, app.env);
    app.use(templates());
  });
}

/**
 * Inherit assemble-core
 */

Assemble.extend(Verb);

/**
 * Similar to [copy](#copy) but calls a plugin `pipeline` if passed
 * on the `options`. This allows plugin pipelines to be programmatically
 * built-up and dynamically changed on-the-fly.
 *
 * ```js
 * verb.process({src: ['a.txt', 'b.txt']}, options);
 * ```
 *
 * @param {Object} `files`
 * @param {Object} `options`
 * @param {Function} `cb`
 * @return {Stream} Returns a [vinyl][] src stream
 * @api public
 */

Verb.prototype.process = function(files, options) {
  options = options || {};
  files.options = files.options || {};
  var pipeline = files.options.pipeline || options.pipeline;
  var opts = utils.extend({}, this.options, files.options, options);

  return this.src(files.src, opts)
    .pipe(this.pipeline(pipeline, opts))
    .pipe(this.dest(files.dest, opts));
};

/**
 * Verb `files` configurations in parallel.
 *
 * ```js
 * verb.each(files, function(err) {
 *   if (err) console.log(err);
 * });
 * ```
 * @param {Object} `config`
 * @param {Function} `cb`
 * @api public
 */

Verb.prototype.each = function(config, cb) {
  async.each(config.files, function(files, next) {
    this.process(files, files.options)
      .on('error', next)
      .on('end', next);
  }.bind(this), cb);
  return this;
};

/**
 * Verb `files` configurations in series.
 *
 * ```js
 * verb.eachSeries(files, function(err) {
 *   if (err) console.log(err);
 * });
 * ```
 * @param {Object} `config`
 * @param {Function} `cb`
 * @api public
 */

Verb.prototype.eachSeries = function(config, cb) {
  async.eachSeries(config.files, function(files, next) {
    this.process(files, files.options)
      .on('error', next)
      .on('end', next);
  }.bind(this), cb);
};

/**
 * Verb files from a declarative [scaffold][] configuration.
 *
 * ```js
 * var Scaffold = require('scaffold');
 * var scaffold = new Scaffold({
 *   options: {cwd: 'source'},
 *   posts: {
 *     src: ['content/*.md']
 *   },
 *   pages: {
 *     src: ['templates/*.hbs']
 *   }
 * });
 *
 * verb.scaffold(scaffold, function(err) {
 *   if (err) console.log(err);
 * });
 * ```
 * @param {Object} `scaffold` Scaffold configuration
 * @param {Function} `cb` Callback function
 * @api public
 */

Verb.prototype.scaffold = function(scaffold, cb) {
  async.eachOf(scaffold, function(target, name, next) {
    this.each(target, next);
  }.bind(this), cb);
};

/**
 * Expose `Verb`
 */

module.exports = Verb;
