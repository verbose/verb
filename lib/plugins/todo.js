'use strict';

var through = require('through2');

module.exports = function(options) {
  var todos = [];

  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();
    if (file.path.indexOf('todo.js') === -1) {
      var match = todo(str);
      if (match) {
        todos.push(match[1]);
      }
    }

    // file.contents = new Buffer(str);
    // this.push(file);
    cb();
  }, function (cb) {
    // console.log(todos)
    cb();
  });
};

function todo(str) {
  var re = /\* @todo([^\n]*)/i;
  return str.match(re);
}