'use strict';

var username = require('git-user-name');

/**
 * Called in the `username` transform, if a `username`
 * cannot be determined from easier means, this attempts
 * to get the `user.name` from global `.git config`
 */

module.exports = function(verb) {
  if (!verb.get('data.git.username')) {
    verb.set('data.git.username', username());
  }
};
