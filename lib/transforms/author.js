'use strict';

var parse = require('parse-author');

module.exports = function(verb) {
  var author = verb.get('data.author');

  if (author && typeof author === 'string') {
    verb.set('data.author', parse(author));
  }
};
