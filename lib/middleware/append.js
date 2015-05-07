'use strict';

/**
 * `append` post-render middleware.
 *
 * If a string is defined on `verb.cache.data.append`,
 * it will be appended to the content of every file
 * that matches the route.
 */

module.exports = function(app) {
  return function (file, next) {
    file.content += app.get('data.append') || '';
    next();
  };
};
