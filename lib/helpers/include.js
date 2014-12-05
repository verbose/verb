'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:include');
var helperBase = require('./base');

module.exports = function(app) {
  app.includes('**/*.md');

  return function(name, locals, cb) {
    debug('include helper: %j', arguments);
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }
    return helperBase(app, 'include', name, locals, cb);
  };
};
