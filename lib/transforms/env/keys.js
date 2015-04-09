'use strict';

/**
 * Adds `Object.keys()` to `verb.cache.data`. Can be used
 * for conflict resolution between helpers and context properties.
 */

module.exports = function keys_(verb) {
  if (!verb.cache.data.hasOwnProperty('keys')) {
    verb.cache.data.keys = Object.keys(verb.env);
  }
};
