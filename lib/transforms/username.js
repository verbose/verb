'use strict';

var username = require('git-username');
var gitname = require('git-user-name');
var utils = require('../shared/utils');

module.exports = function(verb) {
  var name = verb.get('data.username');
  var repo = verb.get('data.repo');

  if (!name && typeof repo === 'string') {
    name = utils.owner(repo);
  }

  if (!name) {
    var url = verb.get('data.author.url');
    if (url) {
      name = utils.owner(url);
    }
  }

  // extract from local git repository
  if (!name) { name = username(); }

  // extract from global or local git config
  if (!name) { name = gitname(); }

  verb.set('data.username', name || '');
};
