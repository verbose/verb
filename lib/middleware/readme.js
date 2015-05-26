'use strict';

/**
 * Set the dest path to `README.md` for `.verb.md` templates
 */

module.exports = function(app) {
  return function(file, next) {
    if (app.isFalse('readme') || app.isTrue('noreadme')) {
      return next();
    }

    if (file.readme === false || file.noreadme === true) {
      return next();
    }

    if (/\.(?:verb(rc)?|readme)\.md$/i.test(file.path)) {
      file.path = 'README.md';
    }
    next();
  };
};
