'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:include');
var helperBase = require('./base');

module.exports = function include(verb) {
  verb.includes('**/*.md');

  return function(name, locals, cb) {
    debug('include helper: %j', arguments);
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }
    return helperBase(verb, 'include', name, locals, cb);
  };
};
