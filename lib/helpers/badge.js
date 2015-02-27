'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:badge');
var helperBase = require('./base');

module.exports = function badge(verb) {
  var helper = helperBase(verb, 'badge');
  verb.badges('**/*.md');

  return function(name, locals, cb) {
    debug('badge helper: %j', arguments);
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }
    return helper(name, locals, cb);
  };
};
