'use strict';

var utils = require('./utils');

function Locals(name, app) {
  this.cache = app.cache.data[name] || (app.cache.data[name] = {});
}

Locals.prototype.get = function(key) {
  return utils.get(this.cache, key);
};

Locals.prototype.set = function(key, value) {
  utils.set(this.cache, key, value);
  return this;
};

/**
 * Expose Locals
 */

module.exports = function(app) {
  app.locals = new Locals('verb', app);
};

// module.exports = Locals;
