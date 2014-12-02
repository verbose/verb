'use strict';

var _ = require('lodash');

/**
 * Filter plugins to extend the config object.
 *
 * @api private
 */

module.exports = function filterPlugins(obj) {
  var plugins = obj._plugins.plugins;

  obj.plugins = _.filter(plugins, function(value, key) {
    if (['plugin'].indexOf(key) !== -1) {
      return true;
    }
  });

  obj.tags = _.filter(plugins, function(value, key) {
    if (['tag'].indexOf(key) !== -1) {
      return true;
    }
  });

  obj.helpers = _.filter(plugins, function(value, key) {
    if (['helper'].indexOf(key) !== -1) {
      return true;
    }
  });
};

