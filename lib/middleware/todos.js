'use strict';

/**
 * Add todos to the `file.todos` object
 */

var re = /<!--[ \t]*todo:[ \t]*([^\n]+)[ \t]*-->|@todo:[ \t]*([^\n]+)/i;

module.exports = function todos_(verb) {
  return function (file, next) {
    var todos = verb.cache.data.todos || [];
    var match, res = [], str = file.content;

    while (match = re.exec(str)) {
      str = str.split(match[0]).join('');
      res.push(format(match[1] || match[2]));
    }

    file.todos = res;
    verb.data({todos: todos.concat(res)});
    next();
  };
};

function format(str) {
  return str.replace(/\s*-->\s*$/, '');
}
