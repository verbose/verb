'use strict';

/**
 * Prime the `file.data.dest` object.
 */

module.exports = function(file, next) {
  file.data.dest = file.data.dest || {};
  next();
};
