'use strict';

var url = require('url');
var utils = require('repo-utils');

/**
 * Normalize repo data
 */

module.exports = function repo(verb) {
  var data = verb.cache.data;
  var repo = data.repository;

  if (repo && typeof repo === 'string') {
    var path = utils.git(url.parse(repo));
    verb.data({repository: {url: path}});
  }
};