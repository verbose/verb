'use strict';

var path = require('path');
var through = require('through2');

module.exports = function(options) {
  return through.obj(function (file, enc, cb) {
    var basename = path.basename(file.path);
    if (basename === '.verbrc.md' || basename === '.verb.md') {
      file.path = 'README.md';
    }
    this.push(file);
    cb();
  });
};
