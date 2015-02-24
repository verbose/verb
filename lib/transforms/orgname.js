'use strict';

var utils = require('../shared/utils');

module.exports = function(verb) {
  var repo = verb.get('data.repository.url') || verb.get('data.repository');
  if (typeof repo === 'object') {
    repo = repo.url;
  }
  verb.set('data.orgname', utils.username(repo));
};
