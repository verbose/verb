'use strict';

var _ = require('lodash');

/**
 * Filter plugins to extend the config object.
 *
 * @api private
 */

module.exports = function filterPlugins(verb) {
  var plugins = verb._plugins.plugins;

  verb.plugins = _.filter(plugins, function(value, key) {
    if (['plugin'].indexOf(key) !== -1) {
      return true;
    }
  });

  verb.tags = _.filter(plugins, function(value, key) {
    if (['tag'].indexOf(key) !== -1) {
      return true;
    }
  });

  verb.helpers = _.filter(plugins, function(value, key) {
    if (['helper'].indexOf(key) !== -1) {
      return true;
    }
  });
};

