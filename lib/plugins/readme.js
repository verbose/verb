'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var through = require('through2');
var verbfiles = ['.verb.md', '.verbrc.md'];

module.exports = function readme() {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      var err = new gutil.PluginError('verb-readme', 'Streaming is not supported.');
      this.emit('error', err);
      return cb();
    }

    if (verbfiles.indexOf(path.basename(file.path)) !== -1) {
      file.path = 'README.md';
    }
    this.push(file);
    cb();
  });
};
