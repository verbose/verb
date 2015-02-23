'use strict';

var utils = require('../utils');

module.exports = function(verb) {
  var author = verb.get('data.author');
  var username = verb.get('data.username');

  if (!username && author.username) {
    verb.set('data.username', author.username);
  } else if (author.url) {
    verb.set('data.username', utils.username(author.url));
  }
};
