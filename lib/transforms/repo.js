'use strict';

var repoutils = require('repo-utils');
var utils = require('../shared/utils');

/**
 * Normalize repo data
 */

module.exports = function(verb) {
  var url = verb.get('data.url');

  if (url.github && typeof url.github === 'string') {
    verb.set('data.repo', url.github);
  } else if (url.homepage && typeof url.homepage === 'string') {
    verb.set('data.repo', url.homepage);
  }
};
