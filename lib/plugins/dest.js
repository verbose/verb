'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var through = require('through2');
var utils = require('../utils');

/**
 * Add dest properties to `file.data`
 */

module.exports = function dest_(destDir) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new utils.PluginError('verb/plugins/init:', 'Streaming is not supported.'));
      return cb();
    }

    try {
      var dest = file.data.dest || {};

      dest.relative = file.relative;
      dest.dirname = file.dest || destDir;
      dest.extname = path.extname(file.relative);
      dest.basename = path.basename(file.relative);
      dest.filename = utils.basename(dest.basename, dest.extname);
      dest.path = path.join(dest.dirname, dest.basename);

      this.push(file);
    } catch (err) {
      console.error(err);
      this.emit('error', new utils.PluginError('verb/plugins/dest:', err));
    }
    return cb();
  });
};
