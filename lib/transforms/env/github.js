'use strict';

var parse = require('parse-github-url');

/**
 * Called in the `init` transform. Adds a `github`
 * property to the context.
 *
 * @param  {Object} `verb`
 */

module.exports = function(verb) {
  var repo = verb.get('data.repository');
  var url = (repo && typeof repo === 'object')
    ? repo.url
    : repo;

  var github = parse(url);
  if (github && Object.keys(github).length) {
    verb.data({github: github});
  }
};
