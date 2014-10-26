'use strict';

var fs = require('fs');

module.exports = function isDir(fp) {
  return fs.statSync(fp).isDirectory();
};
