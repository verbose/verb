'use strict';

var nch = require('noncharacters');
var through = require('through2');

module.exports = function () {
  return function (options) {
    return through.obj(function (file, enc, cb) {
      var str = file.contents.toString();
      str = str.replace(/\{%%[=-]?(\s*)([\s\S]*?)(\s*)=%}/g, nch[0] + '$1$2$3' + nch[1]);

      file.contents = new Buffer(str);
      this.push(file);
      cb();
    });
  };
};