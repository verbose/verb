'use strict';

var through = require('through2');
var utils = require('../utils');

module.exports = function() {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new utils.PluginError('verb plugin', 'Streaming is not supported.'));
      return cb();
    }

    var str = file.contents.toString();

    file.contents = new Buffer(str);
    this.push(file);
    cb();
  });
};
