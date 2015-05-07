'use strict';

var path = require('path');
var utils = require('../utils');

/**
 * Ensure that `ext` is on the file object.
 */

module.exports = function(file, next) {
  if (!file.hasOwnProperty('data')) {
    throw new Error('ext middleware: file object should have a `data` property.');
  }

  if (!file.data.hasOwnProperty('src')) {
    throw new Error('ext middleware: file.data object should have a `src` property.');
  }

  file.ext = file.ext ? utils.formatExt(file.ext) : (file.data.src.ext || path.extname(file.path));
  next();
};
