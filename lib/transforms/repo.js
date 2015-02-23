'use strict';

var url = require('url');
var utils = require('repo-utils');

/**
 * Normalize repo data
 */

module.exports = function(verb) {
  var repo = verb.get('data.repository');

  if (repo && typeof repo === 'string') {
    repo = utils.git(url.parse(repo));
  }

  verb.set('data.repository.url', repo);
};