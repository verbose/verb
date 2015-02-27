'use strict';

var through = require('through2');

module.exports = function(options) {
  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();

    console.log(todos(str))

    // file.contents = new Buffer(str);
    // this.push(file);
    cb();
  });
};

function todos(str) {
  var re = /\*\s*TODO([^\n]*)/g;
  return str.match(re);
}