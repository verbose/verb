'use strict';

var parse = require('parse-author');

/**
 * Called in the `init` transform. Adds an `author`
 * property to the context, or normalizes the existing one.
 *
 * @param  {Object} `verb`
 */

module.exports = function github_(verb) {
  var author = verb.get('data.author');
  if (typeof author === 'string') {
    author = parse(author);
  }
  verb.data({author: author});
};
