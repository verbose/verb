'use strict';

var utils = require('../shared/utils');

module.exports = function(verb) {
  var username = verb.get('data.username');
  var repo = verb.get('data.repo');

  if (!username && typeof repo === 'string') {
    username = utils.owner(repo);
  }

  verb.set('data.username', username || '');
};
