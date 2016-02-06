'use strict';

var Settings = require('merge-settings');
var settings = require('./settings/');
var schema = require('./schema');

/**
 * Create
 */

module.exports = function(options) {
  return function() {
    this.use(schema(options));

    this.define('settings', function(options) {
      return new Settings(this.schema(options))
    });

    this.define('loadSettings', function(argv) {
      var config = this.settings()
        .set('verb', settings.pkg(this, 'verb'))
        .set('file', settings.configfile(this, 'verbfile'))
        .set('opts', settings.opts(this))
        .set('argv', argv);

      var opts = config.merge();
      this.option(opts);
      return opts;
    });
  };
};
