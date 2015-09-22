'use strict';

var get = require('get-value');

function Local(locals) {
  this.locals = locals || {};
}

Local.prototype.get = function(key) {
  return get(this.locals, key);
};

Local.prototype.set = function(key, value) {
  set(this.locals, key, value);
  return this;
};

/**
 * Expose Local
 */

module.exports = Local;
