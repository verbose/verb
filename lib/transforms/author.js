'use strict';

var parse = require('parse-author');

module.exports = function author(verb) {
  var data = verb.cache.data;
  if (typeof data.author === 'string') {
    verb.data({author: parse(data.author)});
  }
};