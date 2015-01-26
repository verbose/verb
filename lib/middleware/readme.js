'use strict';

module.exports = function readme(file, next) {
  if (/\.verb(?:rc)?\.md$/.test(file.path)) {
    file.path = 'README.md';
  }
  next();
};
