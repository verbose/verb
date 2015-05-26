'use strict';

/**
 * Called in the `init` transform to ensure that certain
 * fields are on the context.
 *
 * @param  {Object} `verb`
 */

module.exports = function(verb) {
  verb.cache.missing = verb.cache.missing || {};

  if (!verb.cache.data.hasOwnProperty('licenses')) {
    verb.union('messages.missing.data', ['licenses']);
  }

  if (!verb.cache.data.hasOwnProperty('license')) {
    verb.union('messages.missing.data', ['license']);
  }
};
