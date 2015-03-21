'use strict';

var through = require('through2');
var File = require('vinyl');

module.exports = function todo_(options) {
  var todos = [];

  return through.obj(function (file, enc, cb) {
    if (file.path.substr(-3) === '.js') {
      var str = file.contents.toString();
      var matches = str.match(/\*?\s*@todo([^\n]*)/ig);
      if (match) {
        todos = todos.concat(matches);
      }
    }
    cb();
  }, function (cb) {
    var file = new File({
      path: '_todos.md',
      contents: new Buffer(todos.join('\n'))
    })
    this.push(file);
    cb();
  });
};
