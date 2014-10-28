'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var parsePath = require('parse-filepath');
var _ = require('lodash');
var utils = require('../utils');

/**
 * Calcuate the destination path for each file.
 */

module.exports = function destPath(dest, options) {
  var verb = this;
  var opts = _.extend({}, options);

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('verb-plugin:dest', 'Streaming not supported'));
      return cb();
    }

    try {
      // get the new dest extension based on the engine extension
      var destExt = opts.ext || utils.getDestExt.call(verb, file);
      var relative = file.relative;
      var basename = path.basename(relative, path.extname(relative));

      // actual destination path
      var filepath = path.join(dest, basename + destExt);

      // parse the file into an object, extend `file.dest` with it
      file.dest = parsePath(filepath);
      file.dest.path = filepath;
      file.dest.ext = file.dest.extname;

      // push the file along
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('verb-plugin:dest', err));
    }
    return cb();
  });
};
