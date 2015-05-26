'use strict';

var PluginError = require('plugin-error');
var through = require('through2');
var utils = require('../utils');
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
        this.emit('error', new PluginError(pluginname, 'Streaming is not supported.', {stack: true}));
        return cb();
      }

      locals = _.merge({}, locals, file.locals);
      locals.options = _.merge({}, app.options, locals.options);

      // if (!utils.norender(app, file, locals)) {
      //   this.push(file);
      //   return cb();
      // }

      var template = app.getFile(file);
      template.content = file.contents.toString();

      try {
        var stream = this;
        template.render(locals, function (err, content) {
          if (err) {
            stream.emit('error', new PluginError(pluginname, err, {stack: true}));
            cb(err);
            return;
          }
          file.contents = new Buffer(content);
          stream.push(file);
          return cb();
        });

      } catch (err) {
        this.emit('error', new PluginError(pluginname, err, {stack: true}));
        return cb();
      }
    });
  };
}
