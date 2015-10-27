'use strict';

var get = require('get-value');
var set = require('set-value');
var utils = require('./utils');

module.exports = function (config) {
  if (!config || !config.name) {
    throw new Error('expected config.name to be a string.');
  }

  return function (app) {
    var opts = utils.extend({}, config, app.option('update'));
    this.locals = new Locals(config.name, this);
    return this;
  };
};

function Locals(name, app) {
  this.cache = get(app.cache.data, name) || (app.cache.data[name] = {});
}

Locals.prototype.get = function(key) {
  return get(this.cache, key);
};

Locals.prototype.set = function(key, value) {
  set(this.cache, key, value);
  return this;
};
