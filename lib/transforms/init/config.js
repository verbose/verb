'use strict';

var Store = require('data-store');
var chalk = require('chalk');
var _ = require('lodash');

/**
 * Create a global data config for user values.
 *
 * To get and set values, do the following:
 *
 *   - set: `--set one=abc` or `--set one`
 *   - get: `--set one` or `--get one,two,three`
 */

module.exports = function config_(app) {
  var config = app.config = new Store('verb');
  var del = app.get('argv.del');
  var set = app.get('argv.set');
  var union = app.get('argv.union');
  var get = app.get('argv.get');
  var args;

  if (set) {
    args = set.split('=');
    if (args.length === 2) {
      config.set(args[0], args[1]);
    } else {
      config.set(args[0], true);
    }
  }

  if (union) {
    args = union.split('=');
    if (args.length > 1) {
      var val = config.get(args[1]);
      args[2] = args[2].split(',');
      config.set(args[1], _.union(val, args[2]));
    }
  }

  if (get) {
    if (get === true || get === 'true') {
      console.log(chalk.cyan('config config:'), chalk.bold(JSON.stringify(config.data)));
    } else if (get.indexOf(',') !== -1) {
      get.split(',').forEach(function (val) {
        console.log(val, '=', chalk.bold(JSON.stringify(config.get(val))));
      });
    } else {
      console.log(get, '=', chalk.bold(JSON.stringify(config.get(get))));
    }
  }

  if (del) {
    if (del.indexOf(',') !== -1) {
      del.split(',').forEach(function (val) {
        config.omit(val);
      });
    } else {
      config.omit(del);
    }
    console.log('deleted:', chalk.bold(del));
  }
};
