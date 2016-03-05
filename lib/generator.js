'use strict';

/**
 * Display `--help` when no tasks are defined
 */

module.exports = function(verb) {
  verb.enable('silent');

  verb.task('default', function(cb) {
    verb.cli.process({ help: true }, cb);
  });
};

