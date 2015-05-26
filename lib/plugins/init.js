'use strict';

var PluginError = require('plugin-error');
var through = require('through2');

module.exports = function () {
  var app = this;

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new PluginError('init plugin', 'Streaming is not supported.'));
      return cb();
    }

    try {
      var stream = this;
      file.content = file.contents.toString();
      app.handle('onLoad', file, function (err) {
        if (err) {
          stream.emit('error', new PluginError('renderFile', err, {stack: true}));
          return cb(err);
        }
      });
      this.push(file);
      return cb();
    } catch (err) {
      this.emit('error', new PluginError('init plugin', err, {stack: true}));
      return cb();
    }
  });
};
