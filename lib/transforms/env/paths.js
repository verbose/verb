'use strict';

/**
 * Prime the `verb.paths` object.
 */

module.exports = function(app) {
  app.cache.paths = app.cache.paths || {};
};
