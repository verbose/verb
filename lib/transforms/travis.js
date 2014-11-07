'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');

var re = /.*:\/\/github.com\/(.*)\.git/;

module.exports = function(app) {
  var travis = path.join(process.cwd(), '.travis.yml');
  var exists = fs.existsSync(travis);
  var data = app.cache.data;

  /**
   * If `.travis.yml` exists, add a travis URL to the context for
   * use in templates. No need for this operation otherwise.
   */

  try {
    if(exists) {
      var repo_url = data.repository.url;
      var pathname = url.parse(repo_url).pathname;
      app.set('data.travis_url', repo_url.replace(re, 'https://travis-ci.org/$1'));
    }

    if (!data.hasOwnProperty('travis')) {
      app.set('data.travis', {
        language: "node_js",
        node_js: ["0.10", "0.11"]
      });
    }
  } catch(err) {
    console.log(err);
  }
};