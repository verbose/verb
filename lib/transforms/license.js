'use strict';

var utils = require('../utils');

/**
 * Normalize repo data
 */

module.exports = function license(verb) {
  var license = verb.get('data.license');
  var url = verb.get('data.repository');

  if (typeof url === 'object') { url = url.url; }

  // only make the tranformation on known repos. This is temporary.
  if (utils.isKnownRepo(url)) {

    // make sure it's not the `.license()` helper
    if (license && typeof license !== 'function') {
      verb.set('data.licenses', [license]);

      // now that we've turned the license property into an array we
      // can remove it to avoid conflict with the license helper.
      delete verb.cache.data.license;
    }
  }
};
