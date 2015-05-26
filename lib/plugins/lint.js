'use strict';

var through = require('through2');
var lint = require('lint-templates');

module.exports = function(app) {
  return through.obj(function (file, enc, cb) {
    lint(app, file);
    this.push(file);
    return cb();
  });
};
