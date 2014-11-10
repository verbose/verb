'use strict';

var isFile = require('./isFile');
var path = require('path');

module.exports = function dirname(fp) {
  return isFile(fp) ? path.dirname(fp) : fp;
};
