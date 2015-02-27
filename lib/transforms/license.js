'use strict';

var utils = require('../shared/utils');

/**
 * Normalize repo data
 */

module.exports = function(verb) {
  var license = verb.get('data.license');
  var repo = verb.get('data.repo');

  // only make the tranformation on known repos. This is temporary.
  if (repo && utils.isKnownRepo(repo)) {

    // make sure it's not the `.license()` helper
    if (license && typeof license !== 'function') {
      verb.set('data.licenses', [license]);

      // now that we've turned the license property into an array we
      // can remove it to avoid conflict with the license helper.
      delete verb.cache.data.license;
    }
  }
};
