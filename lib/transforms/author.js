'use strict';

var parse = require('parse-author');

module.exports = function author(app) {
  var data = app.cache.data;

  if (data.author) {
    if (typeof data.author === 'string') {
      app.data({author: parse(data.author)});
    }
  }
};