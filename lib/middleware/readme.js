'use strict';

var path = require('path');

module.exports = function readme(file, next) {
  if (/\.verb(?:rc)?\.md/.test(file.path)) {
    file.path = 'README.md';
  }
  next();
};
