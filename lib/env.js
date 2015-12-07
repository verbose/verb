'use strict';

var utils = require('./utils');

/**
 * Adds get/set methods to verb env
 */

module.exports = function(options) {
  return function(verb) {
    if (!verb.env) {
      verb.env = {
        config: {},
        module: {},
        user: {}
      };
    }

    utils.define(verb.env, 'set', function(key, value) {
      utils.set(this, key, value);
      return this;
    });

    utils.define(verb.env, 'get', function(key) {
      return utils.get(this, key);
    });
  };
};
