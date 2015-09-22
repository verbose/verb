'use strict';

/**
 * module dependencies
 */

var path = require('path');
var store = require('data-store');
var Local = require('./lib/local');
var loader = require('assemble-loader');
var includes = require('readme-includes');
var badges = require('readme-badges');
var Templates = require('templates');
var Composer = require('composer');
var proto = Composer.prototype;
var lib = require('./lib');
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
  this.isVerb = true;
  Templates.apply(this, arguments);
  Composer.apply(this, arguments);
  this.options = options || {};
  this.initVerb(this, this.options);
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

  initVerb: function(app, opts) {
    this.store = store('verb', opts.store);
    this.local = new Local(this.cache.data.verb);

    // console.log(this.local.locals)

    this.initEngines(this);
    this.initMiddleware(this);
    this.initViewTypes(this);

    this.option('view', function (view) {
      if (view.src) view.path = view.src;
    });

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
    this.option('rethrow', {regex: /\{%=?([^%]*)%}/});
    this.engine('hbs', require('engine-handlebars'));
    this.engine('md', require('engine-base'), {
      delims: ['{%', '%}']
    });
  },

  /**
   * Default middleware
   *  | Ensure user-defined layout is recognized
   *  | Parse front-matter
   */

  initMiddleware: function (app) {
    this.onLoad(/\.md$/, function (view, next) {
      utils.matter.parse(view, next);
    });
  },

  /**
   * Default `viewTypes`
   *  | includes
   *  | layouts
   *  | pages
   *  | files
   */

  initViewTypes: function () {
    // this.use(loader());
    this.defaultHelpers();

    this
      .use(loader())
      .use(function (app) {
        return function (collection) {
          if (!collection.isCollection) return collection;
          var fn = this.getView;

          this.getView = function (name) {
            return fn.apply(this, arguments) || this.loadView(name, {
              ext: '.md'
            });
          };
          return this;
        };
      });

    this.data('author', {
      name: 'Jon Schlinkert'
    });
    this.data('twitter', {
      username: 'jonschlinkert'
    });
    this.data('github', {
      username: 'jonschlinkert'
    });

    this.data('runner', {
      name: this.get('cache.data.name'),
      url: this.get('cache.data.repository.url'),
    });

    this.create('includes', {
      viewType: ['partial'],
      renameKey: function (key) {
        var cwd = this.options.cwd;
        if (!cwd || key.indexOf(cwd) === -1) {
          return key;
        }
        var len = cwd.length + 1;
        return key.slice(len);
      },
      cwd: includes,
      engine: 'md',
    });

    this.create('badges', {
      viewType: ['partial'],
      renameKey: function (key) {
        var cwd = this.options.cwd || '';
        var len = cwd.length + 1;
        return key.slice(len);
      },
      cwd: badges,
      engine: 'md'
    });

    this.create('docs', {
      viewType: ['partial'],
      renameKey: utils.basename,
      engine: 'md'
    });

    this.create('layouts', {
      viewType: ['layout'],
      renameKey: utils.basename,
      engine: 'md'
    });

    this.include('npm', {
      content: '[![total downloads](https://img.shields.io/npm/dt/{%= name %}.svg)](https://www.npmjs.com/package/{%= name %})'
    });

    this.create('files');
  },

  defaultHelpers: function () {
    this.helper('date', function () {
      return new Date();
    });

    var mdu = require('markdown-utils');
    this.helperGroup('mdu', mdu);

    this.helper('log', function (msg) {
      console.log.apply(console, arguments);
    });

    this.helper('related', function (keys) {
      var url = 'https://www.npmjs.com/package/';
      keys = utils.arrayify(keys);
      keys.forEach(function (key, i) {
        keys[i] = '+ ' + mdu.link(key, url + key);
      });
      return '\n' + keys.join('\n');
    });

    this.asyncHelper('trim', function (str) {
      return str.trim();
    });

    this.helper('license', function () {

    });

    this.helper('copyright', function () {

    });

    lib.config(this, this.local.locals);
  },

  local: function (key) {
    return this.get('cache.data.verb.' + key);
  },

  // userConfig: function () {
  //   // this.helpers(this.store.get('helpers'));
  //   // this.helpers(this.local.get('helpers'));

  //   // this.asyncHelpers(this.store.get('asyncHelpers'));
  //   // this.asyncHelpers(this.local.get('asyncHelpers'));

  //   // console.log(this._.helpers)

  //   // var len = paths.length;
  //   // while(len--) {
  //   //   var fp = tryRead(path.join(paths[len], name));
  //   //   if (fp) return fp;
  //   // }
  // },

  config: function (name, fn) {
    var self = this;
    fn = fn || utils.identity;
    var config = this.get('cache.data.verb.' + name);
    return utils.resolveConfig(config, function (key, val) {
      fn(key, val(self.options));
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
    if (!dest) throw new Error('expected dest to be a string.');
    return utils.vfs.dest.apply(utils.vfs, arguments)
      .on('data', function () {}); // TODO: fix this
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
        var view = views[key];
        var file = utils.toVinyl(view);
        stream.write(file);
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
    var collection = this.viewCollection();

    return utils.through.obj(function (file, enc, cb) {
      if (typeof locals === 'function') {
        cb = locals;
        locals = {};
      }

      try {
        var view = collection.addView(file);
        var ctx = utils.merge({}, app.cache.data, locals, view.data);

        app.render(view, ctx, function (err, res) {
          if (err) return cb(err);
          file = app.view(res);
          cb(null, file);
        });

      } catch(err) {
        err.method = 'renderFile';
        app.emit('error', err);
      }
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
