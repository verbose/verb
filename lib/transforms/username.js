'use strict';

var username = require('../utils/username');

module.exports = function username(app) {
  var data = app.cache.data;

  data.username = typeof data.username === 'string'
    ? data.username
    : (data.repository && data.repository.url)
      ? username(data.repository.url)
      : (data.author && data.author.url)
        ? username(data.author.url) : '';

  if (data.username) {
    app.data({ username: data.username });
  }
};