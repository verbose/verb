'use strict';

/**
 * Module dependencies.
 */

var gutil = require('gulp-util');
var through = require('through2');
var session = require('session-cache')('verb');

module.exports = function render(locals) {
  var verb = this;
  var _name_ = 'task_' + (session.get('task_name'));

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('verb-plugin:render', 'Streaming is not supported.'));
      return cb();
    }

    var collection = verb.collection[_name_];
    var template = verb.views[collection][file.options.key];
    template.content = file.contents.toString();

    try {
      var stream = this;
      verb.render(template, locals, function(err, content) {
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
