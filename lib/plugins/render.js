'use strict';

var rethrow = require('rethrow');
var PluginError = require('plugin-error');
var through = require('through2');
var _ = require('lodash');

/**
 * Expose `render` plugin
 */

module.exports = function(locals) {
  var app = this;

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
          err = formatError(err, file);
          stream.emit('error', new PluginError('render plugin', err));
          return cb(err);
        }
        file.contents = new Buffer(content);
        stream.push(file);
        return cb();
      });
    } catch (err) {
      this.emit('error', new PluginError('render plugin', err));
      return cb();
    }
  });
};

function formatError(err, file) {
  var str = file.orig;
  var name = err.helper.name;
  var args = err.helper.args
  var re = new RegExp('\\{%=\\s*' + name + '\\([\'"]' + args[0]);
  var m = re.exec(str);
  if (!m) return err;

  var formatted = args.map(function(arg) {
    return JSON.stringify(arg);
  });
  var helper = '{%=' + name + '(' + formatted.join(', ') + ') %}';
  var before = str.slice(0, m.index) + helper;
  var lines = before.split('\n');
  var error = rethrow({pointer: true});
  return error(err, file.data.src.path, lines.length - 1, str);
}


