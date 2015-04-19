'use strict';

/**
 * Prime `verb.cache.args`
 */

module.exports = function args_(verb) {
  if (!verb.has('args')) verb.set('args', []);
};
