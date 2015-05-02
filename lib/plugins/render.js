'use strict';

var PluginError = require('plugin-error');
var through = require('through2');
var _ = require('lodash');

/**
 * Expose `render` plugin
 */

module.exports = plugin('verb', 'render');

function plugin(appname, name) {
  var pluginname = appname + '-' + name + ':';

  return function renderPlugin(locals) {
    var app = this;

    locals = locals || {};
    locals.options = locals.options || {};

    return through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        this.push(file);
        return cb();
      }
      if (file.isStream()) {
        this.emit('error', new PluginError(pluginname, 'Streaming is not supported.'));
        return cb();
      }

      locals = _.merge({}, locals, file.locals);
      locals.options = _.merge({}, app.options, locals.options);

      if (norender(app, file.ext, file, locals)) {
        this.push(file);
        return cb();
      }

      var template = app.getTaskFile(file);
      template.content = file.contents.toString();

      try {
        var stream = this;
        template.render(locals, function (err, content) {
          if (err) {
            stream.emit('error', new PluginError(pluginname, err));
            cb(err);
            return;
          }
          file.contents = new Buffer(content);
          stream.push(file);
          return cb();
        });

      } catch (err) {
        this.emit('error', new PluginError(pluginname, err));
        return cb();
      }
    });
  };
}

/**
 * Push the `file` through if the user has specfied
 * not to render it.
 */

function norender(app, ext, file, locals) {
  return !app.engines.hasOwnProperty(ext)
    || app.isTrue('norender') || app.isFalse('render')
    || file.norender === true || file.render === false
    || locals.norender === true || locals.render === false;
}
