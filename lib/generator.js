'use strict';

var path = require('path');
var opts = {alias: {diff: 'diffOnly'}, boolean: ['diff']}
var argv = require('yargs-parser')(process.argv.slice(2), opts);
var cwd = path.resolve.bind(path, __dirname, 'templates');
var common = require('common-middleware');
var reflinks = require('./reflinks');
var utils = require('./utils');
var diff = require('./diff')(argv);

/**
 * Built-in verb tasks
 */

module.exports = function(verb, base) {
  var argv = base.get('cache.argv');
  verb.use(common());

  verb.on('view', function(view) {
    if (view.basename === 'doc.md') {
      view.options.frontMatter = false;
      view.layout = false;
    }
  });

  /**
   * Prompt the user for the `dest` directory to use for generated files.
   * This is called by the [new]() task.
   *
   * ```sh
   * $ verb defaults:dest
   * ```
   * @name dest
   * @api public
   */

  verb.task('dest', function(cb) {
    verb.question('dest', 'Destination directory?', {default: verb.cwd});
    if (verb.option('dest')) return cb();
    verb.ask('dest', {save: false}, function(err, answers) {
      if (err) return cb(err);
      verb.option('dest', path.resolve(verb.cwd, answers.dest));
      cb();
    });
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
      .pipe(reflinks(verb))
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
      file(verb, verb.option('src'), verb.cwd, cb);
    }
  });

  /**
   * Sub-generator with a handful of tasks for generating a file from
   * a template.
   *
   * ```sh
   * $ verb new
   * ```
   * @name new
   * @api public
   */

  verb.register('new', function(app) {
    app.option(verb.options);
    app.task('default', ['verbfile']);

    app.task('verbfile', function(cb) {
      file(app, 'verbfile.js', null, cb);
    });

    app.task('verbmd', function(cb) {
      file(app, '.verb.md', null, cb);
    });

    app.task('readme', function(cb) {
      file(app, 'README.md', null, cb);
    });

    app.task('prompt-verbmd', function(cb) {
      app.confirm('verbmd', 'Looks like .verb.md is missing, want to add one?');
      app.ask('verbmd', function(err, answers) {
        if (err) {
          cb(err);
          return;
        }
        if (answers.verbmd) {
          file(app, '.verb.md', null, cb);
          return;
        }
        cb();
      });
    });

    app.task('doc', function(cb) {
      file(verb, 'doc.md', null, cb);
    });
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
    base.cli.process({ help: true }, cb);
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

  verb.task('default', argv.tasks);
};

/**
 * Generate a file
 */

function file(verb, name, srcBase, cb) {
  var dest = path.resolve(verb.option('dest') || verb.cwd);

  verb.engine('*', require('engine-base'));
  verb.src(name, {cwd: srcBase || cwd()})
    .pipe(verb.renderFile('*'))
    .pipe(utils.format())
    .pipe(verb.conflicts(dest))
    .pipe(verb.dest(function(file) {
      console.log('writing', file.relative, 'to', path.relative(verb.cwd, dest));
      return dest;
    }))
    .on('end', cb);
}
