'use strict';

var github = require('parse-github-url');

/**
 * Called in the `username` transform, if the `git` transform
 * was not able to find anything, this attempts to generate a
 * username from other fields.
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
