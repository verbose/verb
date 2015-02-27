'use strict';

/**
 * Normalize repo data
 */

module.exports = function(verb) {
  var project = verb.get('data.url.project');
  var license = verb.get('data.license');

  if (typeof license === 'string' && license === 'MIT') {
    var file = verb.files('LICENS*');
    license = {};
    license.type = 'MIT';

    // our fallback license URL
    license.url = 'http://opensource.org/licenses/MIT';
    if (file.length) {
      license.url = 'https://github.com/' + project + '/blob/master/' + file[0];
    }
    verb.set('data.licenses', [license]);
  }

  // make sure it's not the `.license()` helper
  if (license && typeof license !== 'function') {
    verb.set('data.licenses', [license]);

    // now that we've turned the license property into an array we
    // can remove it to avoid conflict with the license helper.
    delete verb.cache.data.license;
  }
};
