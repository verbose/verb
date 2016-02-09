'use strict';

var Settings = require('merge-settings');
var settings = require('./settings/');
var schema = require('./schema');

/**
 * Create
 */

module.exports = function(config) {
  return function() {
    this.use(schema(config));

    this.define('settings', function(options) {
      return new Settings(this.schema(options))
    });

    this.define('loadSettings', function(argv, options) {
      var config = this.settings(this.options)
        .set('runner', options || {})
        .set('store', settings.store(this))
        .set('file', settings.configfile(this, 'verbfile'))
        .set('opts', settings.opts(this))
        .set('foo', settings.pkg(this, 'verb'))
        .set('argv', argv);
      return config;
    });
  };
};
