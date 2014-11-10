'use strict';

/**
 * Module dependencies
 */

var _ = require('lodash');
var debug = require('debug')('verb:helper:include');
var chalk = require('chalk');
var helperBase = require('./base');

module.exports = function(app) {
  app.includes('**/*.md');

  return function(name, locals, cb) {
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }

    locals = _.merge({}, this.root.cache.data, locals);

    return helperBase(app, 'include', name, locals, cb);
  };
};
