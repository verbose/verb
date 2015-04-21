'use strict';

var Store = require('data-store');
var chalk = require('chalk');
var _ = require('lodash');

/**
 * Create a global data store for user values.
 *
 * To get and set values, do the following:
 *
 *   - set: `--set one=abc` or `--set one`
 *   - get: `--set one` or `--get one,two,three`
 */

module.exports = function store_() {
  var store = this.store = new Store('verb');
  var del = this.get('argv.del');
  var set = this.get('argv.set');
  var get = this.get('argv.get');

  if (set) {
    var args = set.split('=');
    if (args.length === 2) {
      store.set(args[0], args[1]);
    } else {
      store.set(args[0], true);
    }
  }

  _.merge(this.cache.data, store.data);

  if (get) {
    if (get == true) {
      console.log(chalk.cyan('config store:'), chalk.bold(JSON.stringify(store.data)));
    } else if (get.indexOf(',') !== -1) {
      get.split(',').forEach(function (val) {
        console.log(val, '=', chalk.bold(JSON.stringify(store.get(val))));
      });
    } else {
      console.log(get, '=', chalk.bold(JSON.stringify(store.get(get))));
    }
  }

  if (del) {
    if (del.indexOf(',') !== -1) {
      del.split(',').forEach(function (val) {
        store.omit(val);
      });
    } else {
      store.omit(del);
    }
    console.log('deleted:', chalk.bold(del));
  }
};
