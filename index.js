'use strict';

var path = require('path');
var async = require('async');
var Assemble = require('assemble-core');
var utils = require('./lib/utils');
var env = require('./lib/env');

/**
 * Create a customized `Verb` constructor that calls the given
 * `fn` when an instance is created.
 *
 * ```js
 * var Verb = create(function(verb) {
 *   // add stuff to `verb`
 * });
 * var verb = new Verb();
 * ```
 * @param {Function} `fn`
 * @return {Function}
 * @api public
 */

function create(preload) {

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
    this.isVerb = true;
    this.verbApps = {};

    var opts = this.options;
    this.name = opts.name || 'verb';

    this.use(utils.middleware(opts))
      .use(utils.pipeline(opts))
      .use(utils.store())
      .use(env())

    this.engine(['md', 'text'], require('engine-base'), {
      delims: ['{%', '%}']
    });

    if (typeof preload === 'function') {
      preload.call(this, this, this.base, this.env);
    }
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
   * Get the `base` instance
   */

  Object.defineProperty(Verb.prototype, 'base', {
    configurable: true,
    get: function() {
      return this.parent ? this.parent.base : this;
    }
  });

  return Verb;
};

/**
 * Expose `Verb` with our baseline defaults
 */

module.exports = create(function(verb) {
  function renameKey(key) {
    return path.basename(key, path.extname(key));
  }
  verb.create('docs', { renameKey: renameKey });
  verb.create('includes', {
    renameKey: renameKey,
    viewType: ['partial']
  });
  verb.create('layouts', {
    renameKey: renameKey,
    viewType: ['layout']
  });
});

/**
 * Expose `create` to allow user to instantiate
 * Verb with their own defaults
 */

module.exports.create = create;
