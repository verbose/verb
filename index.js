'use strict';

var path = require('path');
var async = require('async');
var Base = require('assemble-core');
var actions = require('./lib/actions');
var utils = require('./lib/utils');
var pkg = require('./lib/pkg');
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

    this.env = {};
    Base.apply(this, arguments);
    this.isVerb = true;
    this.isApp = true;
    this.apps = {};

    var opts = this.options;
    this.name = opts.name || 'verb';

    this.use(utils.middleware(opts))
      .use(utils.pipeline(opts))
      .use(utils.store())
      .use(actions())
      .use(pkg())
      .use(env());

    this.initVerb(this);
  }

  /**
   * Inherit assemble-core
   */

  Base.extend(Verb);

  /**
   * Initialize verb
   */

  Verb.prototype.initVerb = function(app) {
    this.store.create('config');

    this.engine('hbs', require('engine-handlebars'));
    this.engine(['md', 'text'], require('engine-base'), {
      delims: ['{%', '%}']
    });

    if (typeof preload === 'function') {
      preload.call(app, app, this.base, this.env);
    }
  };

  /**
   * Similar to [copy](#copy) but calls a plugin `pipeline` if defined globally
   * or on the `.process` method `options`. This allows plugin pipelines to
   * be programmatically built-up and dynamically changed on-the-fly.
   *
   * ```js
   * verb.process({src: ['a.txt', 'b.txt']}, options);
   * ```
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
   *   if (err) throw err;
   *   console.log('done!');
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
   * @param {Function} `cb` Callback function that exposes `err`, called after the scaffold is generated.
   * @api public
   */

  Verb.prototype.scaffold = function(scaffold, cb) {
    async.eachOf(scaffold, function(target, name, next) {
      this.each(target, next);
    }.bind(this), cb);
  };

  /**
   * Get the package.json from the current working directory.
   */

  Object.defineProperty(Verb.prototype, '_pkg', {
    configurable: true,
    set: function(pkg) {
      this.cache.pkg = pkg;
    },
    get: function() {
      if (this.cache.pkg) {
        return this.cache.pkg;
      }
      var pkg = this.cache.pkg
        || this.get('env.user.pkg');
      return (this.cache.pkg = pkg);
    }
  });

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
}

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
