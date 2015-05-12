'use strict';

var chalk = require('chalk');

/**
 * Delete a value from the config store.
 *
 * ```sh
 * $ --del foo
 *
 * # delete multiple values
 * $ --del foo,bar,baz
 * ```
 */

module.exports = function(app) {
  var del = app.get('argv.del');
  var config = app.config;

  if (del) {
    config.omit.apply(config, del.split(','));
    console.log('deleted:', chalk.bold(del));
  }
};
