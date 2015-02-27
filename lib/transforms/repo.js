'use strict';

var utils = require('../shared/utils');

/**
 * Normalize repo data
 */

module.exports = function(verb) {
  var repo = verb.get('data.repository.url') || verb.get('data.repository');

  if (repo && typeof repo === 'string') {
    verb.set('data.repo', utils.github(repo));
  }
};