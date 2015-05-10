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
      config.set(args[0], args[1]);
    } else {
      config.set(args[0], true);
    }
  }

  var enable = app.get('argv.enable');
  if (enable) {
    config.set(enable, true);
  }

  var disable = app.get('argv.disable');
  if (disable) {
    config.set(disable, false);
  }
};
