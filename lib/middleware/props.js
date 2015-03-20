'use strict';

module.exports = function props_(file, next) {
  file.options = file.options || {};
  file.locals = file.locals || {};
  next();
};
