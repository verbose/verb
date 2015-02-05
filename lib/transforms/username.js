'use strict';

var un = require('../utils/username');

module.exports = function username(verb) {
  var data = verb.cache.data;

  if (typeof data.username === 'undefined') {
    if (data.author && data.author.url && /github\.com/.test(data.author.url)) {
      data.username = un(data.author.url);
    } else if (data.repository && data.repository.url) {
      data.username = un(data.repository.url);
    } else {
      data.username = '';
    }

    verb.data({ username: data.username });
  }
};
