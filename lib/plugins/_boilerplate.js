'use strict';

var through = require('through2');
var PluginError = require('plugin-error');
var _ = require('lodash');

/**
 * Example Usage
 *
 * ```js
 * module.exports = require('plugin-init')('verb', 'initialize');
 *
 * // or
 * module.exports = require('plugin-init')('verb', 'initialize', {
 *   someOption: 'foo'
 * });
 * ```
 */

module.exports = function (appname, name, config) {
  var plugin = appname + '-' + name;

  return function(options) {
    options = _.extend({}, config, options);

    return through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        this.push(file);
        return cb();
      }
      if (file.isStream()) {
        this.emit('error', new PluginError(plugin, 'Streaming is not supported.'));
        return cb();
      }

      var str = file.contents.toString();

      file.contents = new Buffer(str);
      this.push(file);
      cb();
    });
  };
};
