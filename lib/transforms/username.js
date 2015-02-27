'use strict';

var utils = require('../shared/utils');

module.exports = function(verb) {
  var author = verb.get('data.author');
  var username = verb.get('data.username');
  if (!username) {
    username = author.username || author.url && utils.owner(author.url);
  }
  verb.set('data.username', username);
};
