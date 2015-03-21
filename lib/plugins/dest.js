'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var path = require('path');
var through = require('through2');
var utils = require('../utils');

/**
 * Add dest properties to `file.data`
 */

module.exports = function dest_(destDir, options) {
  var verb = this;

  return through.obj(function (file, encoding, cb) {
    var opts = options || {};

    try {
      var dest = file.data.dest;

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
