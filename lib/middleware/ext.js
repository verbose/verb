'use strict';

var path = require('path');

module.exports = function () {
  return function (file, next) {
    file.ext = path.extname(file.path);
    next();
  };
};
