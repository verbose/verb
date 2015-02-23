'use strict';

var utils = require('../../utils');

module.exports = function(verb) {
  var data = verb.cache.data;
  var repo = data.repository && typeof data.repository === 'object'
    ? data.repository.url
    : data.repository;

  if (typeof data.authors === 'undefined' && utils.isKnownRepo(repo)) {
    verb.data({
      authors: [
        {name: 'Jon Schlinkert', username: 'jonschlinkert'},
        {name: 'Brian Woodward', username: 'doowb'}
      ]
    });
  }
};
