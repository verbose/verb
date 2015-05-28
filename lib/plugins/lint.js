'use strict';

var PluginError = require('plugin-error');
var lint = require('lint-templates');
var through = require('through2');

module.exports = function(options) {
  var app = this;
  return through.obj(function (file, enc, cb) {
    try {
      lint(app, file);
      this.push(file);
      return cb();
    } catch(err) {
      this.emit('error', new PluginError('lint plugin', err, {stack: true}));
      return cb();
    }
  });
};
