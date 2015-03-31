'use strict';

/**
 * Prime `file.locals`
 */

module.exports = function locals_(file, next) {
  file.locals = file.locals || {};
  next();
};
