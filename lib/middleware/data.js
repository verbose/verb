'use strict';

var path = require('path');

/**
 * Prime `file.data.src` and `file.data.dest` so we can extend
 * these in plugins.
 */

module.exports = function data_(file, next) {
  file.data.src = file.data.src || {};
  file.data.dest = file.data.dest || {};
  next();
};
