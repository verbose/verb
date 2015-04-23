'use strict';

/**
 * Modifier to add a github URl if a github username
 * exists on the context.
 */

module.exports = function github_(verb) {
  var username = verb.get('data.github.username');
  if (username) {
    verb.set('data.github.url', 'https://github/' + username);
  }
};
