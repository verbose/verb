'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:include');
var chalk = require('chalk');
var base = require('./base');

module.exports = function(app) {
  app.includes('**/*.md');

  return function(name, locals, cb) {
    return base(app, 'include', name, locals, cb);
  };
};
