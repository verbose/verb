'use strict';

var path = require('path');

module.exports = function filename(file, next) {
  file.data = file.data || {};
  file.data.__dirname = path.dirname(file.path);
  next();
};
