'use strict';

var fs = require('fs');

module.exports = function isFile(fp) {
  return fs.statSync(fp).isFile();
};
