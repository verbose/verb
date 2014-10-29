'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var _ = require('lodash');

module.exports = function render(locals) {
  var verb = this;

  return through.obj(function(file, encoding, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('verb-plugin:render', 'Streaming is not supported.'));
      return cb();
    }

    locals = _.merge({}, verb.cache.data, locals);

    try {
      var name = path.basename(file.path);
      var stream = this;
      verb.render(name, {}, function(err, content) {
        if (err) {
          stream.emit('error', new gutil.PluginError('verb-plugin:render', err));
          cb(err);
          return;
        }

        file.contents = new Buffer(content);
        stream.push(file);
        cb();
      });

    } catch (err) {
      this.emit('error', new gutil.PluginError('verb-plugin:render', err));
      return cb();
    }
  });
};
