'use strict';

var author = require('parse-author');

/**
 * Called in the `init` transform. Adds an `author`
 * property to the context, or normalizes the existing one.
 *
 * @param  {Object} `verb`
 */

module.exports = function author_(verb) {
  var res = verb.get('data.author');
  if (typeof res === 'string') {
    return verb.data({author: author(res)});
  }
};
