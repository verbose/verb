'use strict';

var Config = require('data-store');
var config = require('export-files')(__dirname);

/**
 * Initialize a global config store, for persisting data
 * that may be reused across projects.
 *
 * Initialized in the `init` transform.
 */

module.exports = function(verb) {
  verb.config = new Config('verb');

  verb.transform('set', config.set);
  verb.transform('get', config.get);
  verb.transform('del', config.del);
  verb.transform('option', config.option);
  verb.transform('union', config.union);
};
