'use strict';

/**
 * Module dependencies.
 */

var gutil = require('gulp-util');
var through = require('through2');

/**
 * Routes plugin
 */

module.exports = function routes() {
  var verb = this;

  return through.obj(function (file, encoding, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('Verb#route()', 'Streaming not supported'));
      return cb();
    }

    var stream = this;

    try {
      verb.router.dispatch(file, function (err) {
        if (err) {
          stream.emit('error', new gutil.PluginError('Verb#route()', err));
          cb();
        } else {
          stream.push(file);
          cb();
        }
      });
    } catch (err) {
      stream.emit('error', new gutil.PluginError('Verb#router() - dispatch', err));
      cb();
    }
  });
};

