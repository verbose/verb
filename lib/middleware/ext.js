'use strict';

var path = require('path');

module.exports = function ext(file, next) {
  file.ext = path.extname(file.path);
  next();
};
