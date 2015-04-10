'use strict';

/**
 * Set the dest path to `README.md` for `.verb.md` templates
 */

module.exports = function readme_(file, next) {
  if (file.readme === false || file.noreadme === true) {
    return next();
  }

  if (/\.verb(rc)?\.md$/.test(file.path)) {
    file.path = 'README.md';
  }
  next();
};
