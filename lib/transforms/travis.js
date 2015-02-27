'use strict';

var utils = require('../shared/utils');

/**
 * If `.travis.yml` exists, add a travis URL to the context for
 * use in templates.
 */

module.exports = function travisUrl(verb) {
  var repo = verb.get('data.repo');

  if (repo && typeof repo === 'object') {
    repo = repo.url;
  } else if (!repo) {
    repo = verb.get('data.bugs.url');
  }

  var url = 'https://travis-ci.org/' + utils.project(repo);
  verb.set('data.travis_url', url);
};
