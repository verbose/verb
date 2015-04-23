'use strict';

/**
 * Called in the `init` transform. Adds `user` and `username`
 * for the current project to the context.
 */

module.exports = function user_(verb) {
  verb.set('data.username', verb.get('data.github.username'));
};
