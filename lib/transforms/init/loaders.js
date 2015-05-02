'use strict';

var base = require('base-loader');
var task = require('init-file-loader');

/**
 * Load built-in loaders
 */

module.exports = function loaders_(verb) {
  verb.loader('base', [base]);
  verb.loader('task', [task]);
};
