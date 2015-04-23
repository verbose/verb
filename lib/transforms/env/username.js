'use strict';

var github = require('parse-github-url');
var username = require('git-user-name');

/**
 * Called in the `init` transform. Adds a `username`
 * property to the context.
 *
 * @param  {Object} `verb`
 */

/**
 * Called in the `username` transform, if a `username`
 * cannot be determined from easier means, this attempts
 * to get the `user.name` from global `.git config`
 */

module.exports = function username_(verb) {
  if (!verb.get('data.github.username')) {
    var author = verb.get('data.author');
    if (typeof author.url === 'string' && /\/github/.test(author.url)) {
      var parsed = github(author.url);
      var user = (parsed && parsed.user) || '';
      verb.set('data.github.username', user);
      verb.set('data.username', user);
    }
  }
};
