'use strict';

var utils = require('../shared/utils');

module.exports = function(verb) {
  var repo = verb.get('data.url.repo');

  if (repo && utils.isKnownRepo(repo) && verb.env.authors) {
    verb.data({
      authors: [
        {name: 'Jon Schlinkert', username: 'jonschlinkert'},
        {name: 'Brian Woodward', username: 'doowb'}
      ]
    });
  }
};
