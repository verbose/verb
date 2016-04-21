'use strict';

var cwd = require('memoize-path')(__dirname);

module.exports = function(app, base) {
  var templates = cwd('templates');

  /**
   * Generate a file from a template
   */

  app.register('new', function(sub) {
    sub.task('verbfile', function(cb) {
      file(app, 'verbfile.js', cb);
    });

    sub.task('verbmd', function(cb) {
      file(app, '.verb.md', cb);
    });
  });

  /**
   * Display `--help` when no tasks are defined
   */

  app.task('help', function(cb) {
    base.cli.process({ help: true }, cb);
  });

  /**
   * Default task
   */

  app.task('default', ['help']);
};

/**
 * Generate a file
 */

function file(app, name, cb) {
  app.src(name, {cwd: cwd('templates')()})
    .pipe(app.dest(app.cwd))
    .on('error', cb)
    .on('end', function() {
      console.log(name, 'written to', app.cwd);
      cb();
    });
}
