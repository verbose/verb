'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:badge');
var helperBase = require('./base');

module.exports = function(app) {
  app.badges('**/*.md');

  return function(name, locals, cb) {
    debug('badge helper: %j', arguments);
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }
    return helperBase(app, 'badge', name, locals, cb);
  };
};
