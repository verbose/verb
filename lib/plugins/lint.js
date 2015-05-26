'use strict';

var through = require('through2');
var lint = require('lint-templates');

module.exports = function(app) {
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
