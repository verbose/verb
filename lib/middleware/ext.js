'use strict';

var path = require('path');
var utils = require('../utils');

/**
 * Prime the `file` object with properties that
 * can be extended in plugins.
 */

module.exports = function ext_(file, next) {
  file.ext = utils.formatExt(file.ext || path.extname(file.path));
  next();
};
