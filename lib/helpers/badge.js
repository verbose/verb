'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:badge');
var chalk = require('chalk');
var base = require('./base');

module.exports = function(app) {
  app.badges('**/*.md');
  return function(name, locals, cb) {
    return base(app, 'badge', name, locals, cb);
  };
};
