'use strict';

var PluginError = require('plugin-error');
var through = require('through2');
var _ = require('lodash');

/**
 * Expose `render` plugin
 */

module.exports = function (locals) {
  var app = this;
  var opts = _.extend({showStack: true}, this.options);

  locals = locals || {};
  locals.options = locals.options || {};

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    locals = _.merge({}, locals, file.locals);
    locals.options = _.merge({}, app.options, locals.options);
    file.content = file.contents.toString();

    try {
      var stream = this;
      app.render(file, locals, function (err, content) {
        if (err) {
          stream.emit('error', new PluginError('render plugin', err, opts));
          return cb();
        }
        file.contents = new Buffer(content);
        stream.push(file);
        return cb();
      });
    } catch (err) {
      this.emit('error', new PluginError('render plugin', err, opts));
      return cb();
    }
  });
};
