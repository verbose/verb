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
  var repo = verb.get('data.repository');

  if (typeof repo === 'object') {
    repo = repo.url;
  }

  verb.ifKnown('set', 'data.travis', {
    sudo: false,
    language: 'node_js',
    node_js:  ['iojs', '0.12', '0.10']
  });

  // set default .travis data.
  // TODO: externalize to default config file
  // verb.data({
  //   travis: {
  //     sudo: false,
  //     language: 'node_js',
  //     node_js:  ['iojs', '0.12', '0.10']
  //   }
  // });

  try {
    if(fs.existsSync(cwd('.travis.yml'))) {
      verb.data({travis_url: repo.replace(re, 'https://travis-ci.org/$1')});
    }
  } catch(err) {
    console.log(err);
    throw err;
  }
};