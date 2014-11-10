'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var through = require('through2');
var verbfiles = ['.verb.md', '.verbrc.md'];

module.exports = function() {
  return through.obj(function (file, enc, cb) {
    if (verbfiles.indexOf(path.basename(file.path)) !== -1) {
      file.path = 'README.md';
    }
    this.push(file);
    cb();
  });
};
