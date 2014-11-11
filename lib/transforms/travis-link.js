'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');

var re = /.*:\/\/github.com\/(.*)\.git/;

/**
 * If `.travis.yml` exists, add a travis URL to the context for
 * use in templates.
 */

module.exports = function(app) {
  var travis = path.join(process.cwd(), '.travis.yml');
  var data = app.cache.data;

  try {
    if(fs.existsSync(travis)) {
      var repo_url = data.repository.url;
      var pathname = url.parse(repo_url).pathname;
      app.data({travis_url: repo_url.replace(re, 'https://travis-ci.org/$1')});
    }
  } catch(err) {
    console.log(err);
  }
};