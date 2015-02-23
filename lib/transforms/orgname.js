'use strict';

var utils = require('../utils');

module.exports = function(verb) {
  var repo = verb.get('data.repository');
  var bugs = verb.get('data.bugs.url');

  if (typeof repo === 'object') {
    repo = repo.url;
  }

  verb.set('data.orgname', utils.username(repo));
};
