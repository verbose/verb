'use strict';

var utils = require('./utils');

/**
 * Adds get/set methods to verb env
 */

module.exports = function(options) {
  return function(app) {
    if (!app.env) {
      app.env = {
        config: {},
        module: {},
        user: {}
      };
    }

    utils.define(app.env, 'set', function(key, value) {
      utils.set(this, key, value);
      return this;
    });

    utils.define(app.env, 'get', function(key) {
      return utils.get(this, key);
    });
  };
};
