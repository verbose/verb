'use strict';

var get = require('get-value');

function Locals(cache) {
  this.cache = cache || {};
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
