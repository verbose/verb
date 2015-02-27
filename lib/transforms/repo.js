'use strict';

var repoutils = require('repo-utils');
var utils = require('../shared/utils');

/**
 * Normalize repo data
 */

module.exports = function(verb) {
  var repo = verb.get('data.repository.url') || verb.get('data.repository');

  if (repo && typeof repo === 'string') {
    verb.set('data.repo', utils.github(repo));
  } else if (repo && typeof repo === 'object') {
    verb.set('data.repo', repoutils.github(repo));
  }
};