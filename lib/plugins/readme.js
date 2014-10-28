'use strict';

var path = require('path');
var through = require('through2');

module.exports = function(options) {
  return through.obj(function (file, enc, cb) {
    if (path.basename(file.path) === '.verbrc.md') {
      file.path = 'README.md';
    }
    this.push(file);
    cb();
  });
};
