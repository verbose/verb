'use strict';

module.exports = function dest(file, next) {
  file.dest = file.dest || {};
  next();
};
