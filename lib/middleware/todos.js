'use strict';

/**
 * Add todos to the `file.todos` object
 */

module.exports = function todos_(verb) {
  return function (file, next) {
    var matches = file.content.match(/@todo([^\n]*)/ig);
    if (matches) {
      var todos = verb.cache.data.todos || [];
      verb.data({todos: todos.concat(matches)});
      file.todos = todos.concat(matches);
    }
    next();
  };
};
