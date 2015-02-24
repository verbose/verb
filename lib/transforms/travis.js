'use strict';

var fs = require('fs');
var cwd = require('cwd');

var re = /.*:\/\/github.com\/(.*)\.git/;

/**
 * If `.travis.yml` exists, add a travis URL to the context for
 * use in templates.
 */

module.exports = function travisUrl(verb) {
  var travis = cwd('.travis.yml');
  var repo = verb.get('data.repository');

  if (typeof repo === 'object') {
    repo = repo.url;
  }

  if(fs.existsSync(cwd('.travis.yml'))) {
    verb.data({travis_url: repo.replace(re, 'https://travis-ci.org/$1')});
  }
};