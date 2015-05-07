'use strict';

/**
 * Prime the `verb.cache.messages` object.
 *
 * Messages can be pushed onto this array from plugins, helpers,
 * and middleware to be formatted and output in the terminal when
 * the `verb.messages()` method is called.
 *
 * @param  {Object} `verb`
 */

module.exports = function(app) {
  app.cache.messages = app.cache.messages || {};
};
