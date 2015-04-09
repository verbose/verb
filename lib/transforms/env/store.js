'use strict';

var Store = require('data-store');

/**
 * Create a global data store for the current user.
 */

module.exports = function keys_(verb) {
  if (!verb.cache.data.hasOwnProperty('keys')) {
    verb.cache.data.keys = Object.keys(verb.env);
  }
};
