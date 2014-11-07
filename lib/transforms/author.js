'use strict';

var author = require('parse-author');

module.exports = function (app) {
  var data = app.cache.data;

  if (data.author) {
    if (typeof data.author === 'string') {
      app.data({author: author(data.author)});
    }
  }
};