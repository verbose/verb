'use strict';

var Config = require('data-store');
var config = require('export-files')(__dirname);

/**
 * Initialize a global config store, for persisting data
 * that may be reused across projects.
 *
 * Initialized in the `init` transform.
 */

module.exports = function(app) {
  app.config = new Config('app');

  app.transform('set', config.set);
  app.transform('get', config.get);
  app.transform('del', config.del);
  app.transform('option', config.option);
  app.transform('union', config.union);
};
