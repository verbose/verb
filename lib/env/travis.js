'use strict';

var stringify = require('stringify-travis-url');

/**
 * Called in the `init` transform. Adds a `travis_url`
 * property to the context.
 *
 * @param  {Object} `verb`
 */

module.exports = function travis_(verb) {
  var github = verb.get('data.github');
  var travis = stringify(github.user, github.repo);
  verb.set('data.travis_url', travis);
};
