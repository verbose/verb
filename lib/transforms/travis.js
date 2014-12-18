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

  if(fs.existsSync(travis)) {
    var repo_url = verb.cache.data.repository.url;
    verb.data({travis_url: repo_url.replace(re, 'https://travis-ci.org/$1')});
  }
};
