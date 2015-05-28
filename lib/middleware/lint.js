'use strict';

/**
 * Resolve conflicts between helpers and data
 * properties before rendering.
 */

var lint = require('lint-templates');

module.exports = function(app) {
  return function (file, next) {
    lint(app, file);
    next();
  };
};
