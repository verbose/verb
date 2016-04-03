'use strict';

/**
 * Display `--help` when no tasks are defined
 */

module.exports = function(app) {
  app.enable('silent');

  app.task('default', function(cb) {
    app.cli.process({ help: true }, cb);
  });
};

