'use strict';

var parse = require('parse-author');

/**
 * If `author` is a string, parse it into an object.
 */

module.exports = function(verb) {
  var author = verb.get('data.author');

  if (author && typeof author === 'string') {
    verb.set('data.author', parse(author));
  }
};
