'use strict';

/**
 * Prime the `verb.cache.argv` object. Used for setting values
 * that are passed from the command line.
 */

module.exports = function argv_(app) {
  app.cache.argv = app.cache.argv || {};
};
