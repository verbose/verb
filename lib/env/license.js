'use strict';

/**
 * Called in the `init` transform to ensure that a
 * license field is on the context.
 *
 * @param  {Object} `verb`
 */

module.exports = function license_(verb) {
  if (!verb.cache.data.hasOwnProperty('license')) {
    verb.union('missing.data', ['license']);
  }
};
