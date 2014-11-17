'use strict';

module.exports = function data(file, next) {
  file.data = file.data || {};
  next();
};
