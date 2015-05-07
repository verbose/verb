'use strict';

/**
 * Persist a value on the config store.
 *
 * ```sh
 * $ --option one=abc
 * #=> {one: 'abc'}
 *
 * $ --option one
 * #=> {one: true}
 * ```
 */

module.exports = function(app) {
  var config = app.config;
  var args;

  var option = app.get('argv.option');
  if (option) {
    args = option.split('=');
    if (args.length === 2) {
      config.option(args[0], args[1]);
    } else {
      config.option(args[0], true);
    }
  }
};
