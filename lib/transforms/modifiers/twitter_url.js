'use strict';

/**
 * Modifier to add a twitter URl if a twitter username
 * exists on the context.
 */

module.exports = function twitter_(verb) {
  var username = verb.get('data.twitter.username');
  if (username) {
    verb.set('data.twitter.url', 'http://twitter/' + username);
  }
};
