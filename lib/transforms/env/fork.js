'use strict';

/**
 * Adds a `fork` URL to the context
 */

module.exports = function(app) {
  var repo = app.get('data.repository');
  if (! repo) {
    return;
  }
  var url = repo.url.replace(/\.git$/, '');
  url = url.replace(/git:\/\//, 'https://');
  app.data({fork: url + '/fork'});
};
