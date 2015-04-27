'use strict';

/**
 * Prime the `verb.paths` object.
 */

module.exports = function paths_(app) {
  if (!app.has('paths')) app.paths = {};
};
