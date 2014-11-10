'use strict';

var path = require('path');

module.exports = function ext(filepath) {
  return path.extname(filepath);
};
