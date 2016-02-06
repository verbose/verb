'use strict';

/**
 * Load pipeline plugins
 */

module.exports = function(app) {
  return function(plugins) {
    for (var key in plugins) {
      if (plugins.hasOwnProperty(key)) {
        var val = plugins[key];
        this.plugin(key, val.options, val.fn);
      }
    }
  };
};
