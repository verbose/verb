'use strict';

var mm = require('micromatch');
var bold = require('ansi-bold');

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
  var keys = mm(Object.keys(config.data), del);

  if (keys.length) {
    config.omit.apply(config, keys);
    console.log('deleted:', bold(keys.join(', ')));
  }
};
