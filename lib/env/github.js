'use strict';

var parse = require('parse-github-url');

/**
 * Called in the `init` transform. Adds a `github`
 * property to the context.
 *
 * @param  {Object} `verb`
 */

module.exports = function github_(verb) {
  var repo = verb.env.repository;
  var url = (repo && typeof repo === 'object')
    ? repo.url
    : repo;

  var github = parse(url);
  if (github) {
    verb.data({github: github});
  }
};
