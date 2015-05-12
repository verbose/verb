'use strict';

/**
 * Called in the `init` transform. Normalizes the
 * `repository` field.
 */

module.exports = function(app) {
  var repo = app.get('data.repository');
  if (typeof repo === 'string') {
    repo = 'git://github.com/' + repo + '.git';
    app.data({repository: {url: repo}});
  }
};
