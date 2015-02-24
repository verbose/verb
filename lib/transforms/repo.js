'use strict';

var url = require('url');
var utils = require('repo-utils');
var repository = require('./repository');

/**
 * Normalize repo data
 */

module.exports = function(verb) {
  var repo = repository(verb);
  if (repo && typeof repo === 'string') {
    verb.set('data.repo', utils.github(url.parse(repo)));
  }
};