

var stack = require('callsite');
var path = require('path');
var cwd = path.resolve.bind(path, __dirname, 'templates');
var reflinks = require('./reflinks');
var utils = require('./utils');

module.exports = function(verb, base) {
  var argv = base.get('cache.argv');

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
      .pipe(utils.format())
      .pipe(verb.dest(function(file) {
        file.basename = (argv.name || path.basename(src));
        return (dest || path.resolve(path.dirname(src)));
      }))
      .on('error', cb)
      .on('end', cb);
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

    app.task('verbfile', function(cb) {
      file(app, 'verbfile.js', cb);
    });

    app.task('verbmd', function(cb) {
      file(app, '.verb.md', cb);
    });

    app.task('readme', function(cb) {
      file(app, 'README.md', cb);
    });

    app.task('prompt-verbmd', function(cb) {
      app.confirm('verbmd', 'Looks like .verb.md is missing, want to add one?');
      app.ask('verbmd', function(err, answers) {
        if (err) {
          cb(err);
          return;
        }
        if (answers.verbmd) {
          file(app, '.verb.md', cb);
          return;
        }
        cb();
      });
    });

    app.task('doc', function(cb) {
      file(verb, 'doc.md', cb);
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

function file(verb, name, cb) {
  var dest = verb.option('dest') || verb.cwd;

  verb.engine('*', require('engine-base'));
  verb.src(name, {cwd: cwd()})
    .pipe(verb.renderFile('*'))
    .pipe(verb.conflicts(dest))
    .pipe(verb.dest(dest))
    .on('error', cb)
    .on('end', function() {
      console.log(name, 'written to', dest);
      cb();
    });
}
