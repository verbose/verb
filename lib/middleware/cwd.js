'use strict';

/**
 * Prime the `file` object with properties that
 * can be extended in plugins.
 */

module.exports = function cwd_(verb) {
  return function (file, next) {
    file.cwd = file.data.cwd || verb.cwd || file.cwd || '.';
    next();
  };
};
