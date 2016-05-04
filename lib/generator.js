'use strict';

var path = require('path');
var cwd = path.resolve.bind(path, __dirname, 'templates');

module.exports = function(verb, base) {
  var argv = verb.get('cache.argv');

  /**
   * Generate a file from a template
   */

  verb.register('new', function(app) {
    app.task('verbfile', function(cb) {
      file(app, 'verbfile.js', cb);
    });

    app.task('verbmd', function(cb) {
      file(app, '.verb.md', cb);
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
  });

  /**
   * Display `--help` when no tasks are defined
   */

  verb.task('help', { silent: true }, function(cb) {
    base.cli.process({ help: true }, cb);
  });

  /**
   * Default task
   */

  verb.task('default', argv.tasks);
};

/**
 * Generate a file
 */

function file(verb, name, cb) {
  verb.src(name, {cwd: cwd('templates')})
    .pipe(verb.dest(verb.cwd))
    .on('error', cb)
    .on('end', function() {
      console.log(name, 'written to', verb.cwd);
      cb();
    });
}
