'use strict';

var filter = require('object.filter');

/**
 * Filter plugins to extend the config object.
 *
 * @api private
 */

module.exports = function filterPlugins(obj) {
  var plugins = obj._plugins.plugins;

  obj.plugins = filter(plugins, function(value, key) {
    if (['plugin'].indexOf(key) !== -1) {
      return true;
    }
  });

  obj.tags = filter(plugins, function(value, key) {
    if (['tag'].indexOf(key) !== -1) {
      return true;
    }
  });

  obj.helpers = filter(plugins, function(value, key) {
    if (['helper'].indexOf(key) !== -1) {
      return true;
    }
  });
};

