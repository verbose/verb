'use strict';

var utils = require('../utils');

module.exports = function username(verb) {
  var data = verb.cache.data;

  if (typeof data.username === 'undefined') {
    if (data.repository && data.repository.url) {
      data.username = utils.username(data.repository.url);
    } else if (data.author && data.author.url && /github\.com/.test(data.author.url)) {
      data.username = utils.username(data.author.url);
    } else {
      data.username = '';
    }

    verb.data({ username: data.username });
  }
};
