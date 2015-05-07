'use strict';

var base = require('base-loader');
var task = require('init-file-loader');

/**
 * Load built-in loaders
 */

module.exports = function(app) {
  app.loader('base', [base]);
  app.loader('task', [task]);
};
