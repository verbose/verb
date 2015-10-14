'use strict';

var get = require('get-value');
var set = require('set-value');

function Locals(name, app) {
  this.cache = app.cache.data[name] || (app.cache.data[name] = {});
}

Locals.prototype.get = function(key) {
  return get(this.cache, key);
};

Locals.prototype.set = function(key, value) {
  set(this.cache, key, value);
  return this;
};

/**
 * Expose Locals
 */

module.exports = Locals;
