'use strict';

/**
 * Load pipeline plugins
 */

module.exports = function(app) {
  return function(plugins) {
    for (var key in plugins) {
      if (plugins.hasOwnProperty(key)) {
        this.plugin(key, plugins[key]);
      }
    }
  };
};
