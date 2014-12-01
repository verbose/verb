'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:docs');
var helperBase = require('./base');

module.exports = function(app) {
  app.docs('docs/**/*.md');

  return function(name, locals, cb) {
    debug('docs helper: %j', arguments);
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }
    return helperBase(app, 'doc', name, locals, cb);
  };
};
