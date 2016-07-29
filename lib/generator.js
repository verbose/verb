'use strict';

var path = require('path');
var cwd = path.resolve.bind(path, __dirname, 'templates');
var utils = require('./utils');
var list = require('./list');
var argv = utils.parseArgs(process.argv.slice(2));
var diff = require('./diff')(argv);

/**
 * Built-in verb tasks
 */

module.exports = function(verb, base) {
  var common = new utils.DataStore('common-config');
  var gm = path.resolve.bind(path, utils.gm);
  var cwd = path.resolve.bind(path, verb.cwd);

  verb.use(utils.middleware());

  /**
   * Listen for errors
   */

  verb.on('error', function(err) {
    console.error(err);
    process.exit(1);
  });

  /**
   * Format a markdown file using [pretty-remarkable][]. Optionally
   * specify a `--dest` directory and/or file `--name`.
   *
   * ```sh
   * $ verb format --src=foo/bar.md --dest=baz
   * ```
   * @name format
   * @api public
   */

  verb.task('format', function(cb) {
    var src = verb.option('src');
    var dest = verb.option('dest');

    verb.src(src)
      .pipe(utils.reflinks(verb))
      .pipe(diff('before'))
      .pipe(utils.format())
      .pipe(diff('after', 'before'))
      .pipe(verb.dest(function(file) {
        if (argv.name) file.basename = argv.name;
        return dest || file.dirname;
      }))
      .on('data', function(file) {
        console.log('formatted "%s"', file.relative);
      })
      .on('error', cb)
      .on('end', cb);
  });

  /**
   * Render a single `--src` file to the given `--dest` or current working directory.
   *
   * ```sh
   * $ verb defaults:render
   * # aliased as
   * $ verb render
   * ```
   * @name render
   * @api public
   */

  verb.task('render', function(cb) {
    if (!verb.option('src')) {
      verb.emit('error', new Error('Expected a `--src` filepath'));
    } else if (!verb.option('dest')) {
      verb.build(['dest', 'render'], cb);
    } else {
      file(verb, verb.option('src'), { dest: verb.cwd }, cb);
    }
  });

  /**
   * The `new` sub-generator has a handful of tasks for quickly generating a file from
   * a template. Tasks on the sub-generator are called with `verb new:foo`, where `foo`
   * is the name of the task to run.
   *
   * @name new
   * @api public
   */

  verb.register('new', function(app) {
    app.option(verb.options);

    /**
     * On all generators, the `default` task is executed when no other task name
     * is given. Thus, on the `new` sub-generator, the `new:default` task is an alias that allows
     * you to execute the `new:verbfile` task with the following command:
     *
     * ```sh
     * $ verb new
     * # or, if you prefer verbose commands
     * $ verb new:default
     * ```
     * @name new:default
     * @api public
     */

    app.task('default', ['verbfile']);

    /**
     * Generate a `verbfile.js` in the current working directory.
     *
     * ```sh
     * $ verb new:verbfile
     * ```
     * @name new:verbfile
     * @api public
     */

    app.task('verbfile', function(cb) {
      file(app, 'verbfile.js', null, cb);
    });

    /**
     * Generate a `.verb.md` file in the current working directory.
     *
     * ```sh
     * $ verb new:verbmd
     * ```
     * @name new:verbmd
     * @api public
     */

    app.task('verbmd', function(cb) {
      file(app, '_verb.md', null, cb);
    });

    /**
     * Generate a `.verbrc.json` file in the current working directory.
     *
     * ```sh
     * $ verb new:verbmd
     * ```
     * @name new:verbmd
     * @api public
     */

    app.task('rc', function(cb) {
      file(app, '_verbrc.json', null, cb);
    });

    /**
     * Generate a `README.md` in the current working directory (the task will prompt
     * for project `name` and `description`).
     *
     * ```sh
     * $ verb new:readme
     * ```
     * @name new:readme
     * @api public
     */

    app.task('readme', function(cb) {
      file(app, 'README.md', null, cb);
    });

    /**
     * Prompts the user to add a `.verb.md` (this task runs automatically when the
     * `verb` command is given if `verbfile.js` and `.verb.md` are both missing from the
     * current working directory):
     *
     * ```sh
     * $ verb new:prompt-verbmd
     * ```
     * @name new:prompt-verbmd
     * @api public
     */

    app.task('prompt-verbmd', {silent: true}, function(cb) {
      app.confirm('verbmd', 'Looks like .verb.md is missing, want to add one?');
      app.ask('verbmd', {save: false}, function(err, answers) {
        if (err) {
          cb(err);
          return;
        }

        if (answers.verbmd) {
          app.build('verbmd', cb);
        } else {
          cb();
        }
      });
    });
  });

  /**
   * Display a list of installed verb generators.
   *
   * ```sh
   * $ verb list
   * ```
   * @name list
   * @api public
   */

  verb.task('list', { silent: true }, function() {
    return verb.src([gm('verb-generate-*'), cwd('node_modules/verb-generate-*')])
      .pipe(utils.through.obj(function(file, enc, next) {
        file.alias = verb.toAlias(file.basename);
        next(null, file);
      }))
      .pipe(list(verb));
  });

  /**
   * Display a help menu of available commands and flags.
   *
   * ```sh
   * $ verb help
   * ```
   * @name help
   * @api public
   */

  verb.task('init', { silent: true }, function(cb) {
    verb.question('init', 'Would you like to use defaults, or choose settings?', {
      type: 'list',
      choices: ['defaults', 'choose'],
      all: false
    });

    verb.ask('init', {save: false}, function(err, answers) {
      if (err) {
        cb(err);
        return;
      }

      switch (answers.init) {
        case 'defaults':
          console.log(verb.globals.data);
          break;
        case 'choose':
        default: {
          console.log('foo');
          break;
        }
      }

      cb();
    });
  });

  /**
   * Save personal defaults in user home.
   */

  verb.register('store', function(gen) {
    gen.enable('silent');

    gen.task('del', function(cb) {
      var keys = ['name', 'username', 'twitter', 'email'];
      keys.forEach(function(key) {
        console.log(verb.log.red('  Deleted:'), key, common.get(key));
        common.del(keys);
      });
      cb();
    });

    gen.task('show', function(cb) {
      var keys = ['name', 'username', 'twitter', 'email'];
      console.log();
      keys.forEach(function(key) {
        console.log(key + ': ' + verb.log.cyan(common.get(key)));
      });
      console.log();
      cb();
    });

    gen.task('me', function(cb) {
      console.log();
      console.log('  Answers to the following questions will be stored in:', verb.log.bold('~/.common-config.json'));
      console.log('  The stored values will be used later in (your) templates.');
      console.log(`  To skip a question, just hit ${verb.log.bold('<enter>')}`);
      console.log();

      gen.question('common.name', 'What is your name?');
      gen.question('common.username', 'GitHub username?');
      gen.question('common.url', 'GitHub URL?');
      gen.question('common.twitter', 'Twitter username?');
      gen.question('common.email', 'Email address?');

      gen.ask('common', {save: false}, function(err, answers) {
        if (err) return cb(err);

        if (!answers.common) {
          cb();
          return;
        }

        var vals = [];
        for (var key in answers.common) {
          if (answers.common.hasOwnProperty(key)) {
            var val = answers.common[key];
            common.set(key, val);
            vals.push(verb.log.green(key + ': ' + val));
          }
        }

        console.log();
        console.log('  Saved:');
        console.log();
        console.log('   ', vals.join('\n    '));
        console.log();
        console.log('  To delete these values, run:');
        console.log();
        console.log(verb.log.bold('    $ gen store:del'));
        console.log();
        console.log('  To update these values, run:');
        console.log();
        console.log(verb.log.bold('    $ gen store:me'));
        console.log();
        cb();
      });
    });

    gen.task('default', ['me']);
  });

  /**
   * Display a help menu of available commands and flags.
   *
   * ```sh
   * $ verb help
   * ```
   * @name help
   * @api public
   */

  verb.task('help', { silent: true }, function(cb) {
    verb.enable('silent');
    verb.cli.process({ help: true }, cb);
  });

  /**
   * Default task for the built-in `defaults` generator.
   *
   * ```sh
   * $ verb defaults
   * ```
   * @name defaults
   * @api public
   */

  verb.task('default', ['help']);
};

/**
 * Generate a file
 */

function file(verb, src, options, cb) {
  var defaults = { cwd: cwd(), dest: verb.cwd };
  var opts = utils.extend({}, defaults, options);
  var dest = path.resolve(opts.dest);

  verb.engine('*', require('engine-base'));
  verb.src(src, {cwd: opts.cwd, layout: null})
    .pipe(verb.renderFile('*'))
    .pipe(utils.format())
    .pipe(verb.conflicts(dest))
    .pipe(verb.dest(function(file) {
      if (opts.name) file.basename = opts.name;
      file.basename = file.basename.replace(/^_/, '.');
      file.basename = file.basename.replace(/^\$/, '');
      verb.log.success('created', file.relative);
      return dest;
    }))
    .on('end', cb);
}
