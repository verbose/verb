'use strict';

/**
 * Called in the `init` transform to ensure that a
 * license field is on the context.
 *
 * @param  {Object} `verb`
 */

module.exports = function licenses_(verb) {
  if (!verb.cache.data.hasOwnProperty('licenses')) {
    verb.union('missing.data', ['licenses']);
  }
};
