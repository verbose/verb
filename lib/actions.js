'use strict';

var utils = require('./utils');

/**
 * Adds an `action` object with `get` and `set` methods
 * to `app`, `collection` and `view`
 */

module.exports = function() {
  return function plugin(app) {
    if (!app.has('cache.actions')) {
      app.set('cache.actions', {});
    }

    app.mixin('actions', new Actions(app.cache.actions));
    return plugin;
  };
};

function Actions() {}

Actions.prototype.set = function(key, val) {
  if (typeof key === 'string' && typeof val === 'undefined') {
    val = true;
  }
  utils.set(this, key, val);
  return this;
};

Actions.prototype.has = function(key) {
  return utils.has(this, key);
};

Actions.prototype.get = function(key) {
  return utils.get(this, key);
};
