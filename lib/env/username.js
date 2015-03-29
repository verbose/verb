'use strict';

var github = require('parse-github-url');

/**
 * Called in the `init` transform. Adds a `username`
 * property to the context.
 *
 * @param  {Object} `verb`
 */

module.exports = function username_(verb) {
  var author = verb.get('data.author');

  if (typeof author.url === 'string' && /\/github/.test(author.url)) {
    var parsed = github(author.url);
    if (parsed.user) {
      verb.data({username: parsed.user});
    }
  }
};
