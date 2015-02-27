'use strict';

var nch = require('noncharacters');
var through = require('through2');

module.exports = function () {
  return function (options) {
    return through.obj(function (file, enc, cb) {
      var str = file.contents.toString();
      str = str.replace(/\{%%[=-]?(\s*)([\s\S]*?)(\s*)=%}/g, '\uFFFF$1$2$3\uFFFE');

      file.contents = new Buffer(str);
      this.push(file);
      cb();
    });
  }
};