'use strict';

var stringify = require('stringify-travis-url');

/**
 * Called in the `init` transform. Adds a `travis_url`
 * property to the context.
 */

module.exports = function(app) {
  var github = app.get('data.github');
  if (! github) {
    return;
  }
  var travis = stringify(github.user, github.repo);
  app.set('data.travis_url', travis);
};
