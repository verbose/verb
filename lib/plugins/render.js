'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var session = require('session-cache')('verb');
var extend = require('extend-shallow');

module.exports = function render(locals) {
  var verb = this;

  locals = locals || {};
  locals.options = locals.options || {};
  var _name_ = 'task_' + (session.get('task_name'));

  return through.obj(function (file, enc, cb) {
    var ext = path.extname(file.path);

    if (!verb.engines.hasOwnProperty(ext)
        || verb.enabled('norender')
        || file.norender === true
        || file.render === false
        || locals.norender === true
        || locals.render === false) {
      this.push(file);
      return cb();
    }

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
    locals.options = extend(locals.options, verb.options);

    if (!locals.hasOwnProperty(ext)) {
      locals.ext = ext;
    }

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
      console.error(err)
      this.emit('error', new gutil.PluginError('verb-plugin:render', err));
      return cb();
    }
  });
};
