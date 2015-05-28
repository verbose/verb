'use strict';

var bold = require('ansi-bold');
var cyan = require('ansi-cyan');

/**
 * Get a value from the config store.
 *
 * ```sh
 * $ --get one
 * # or
 * $ --get one,two,three
 * ```
 */

module.exports = function(app) {
  var config = app.config;
  var get = app.get('argv.get');

  if (get) {
    if (get === true || get === 'true') {
      console.log(cyan('config config:'), stringify(config.data));
    } else if (get.indexOf(',') !== -1) {
      get.split(',').forEach(function (val) {
        console.log(val, '=', stringify(config.get(val)));
      });
    } else {
      console.log(get, '=', stringify(config.get(get)));
    }
  }
};

function stringify(val) {
  return bold(JSON.stringify(val));
}
