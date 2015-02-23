'use strict';

var fs = require('fs');
var cwd = require('cwd');

var re = /.*:\/\/github.com\/(.*)\.git/;

/**
 * If `.travis.yml` exists, add a travis URL to the context for
 * use in templates.
 */

module.exports = function travisLink(verb) {
  var travis = cwd('.travis.yml');
  var data = verb.cache.data;

  try {
    if(fs.existsSync(travis)) {
      var repo = data.repository && data.repository.url;
      verb.data({travis_url: repo.replace(re, 'https://travis-ci.org/$1')});
    }
  } catch(err) {
    if (verb.disabled('silent') || verb.enabled('verbose')) {
      throw err;
    }
  }
};
