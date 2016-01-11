'use strict';

/**
 * Add a reflinks helper to
 */

module.exports = function(method) {
  return function(err, view, next) {
    if (!err) return next();
    console.error(method + ' ' + err.message);
    next();
  };
};
