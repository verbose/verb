'use strict';

var through = require('through2');
var PluginError = require('plugin-error');
var reflinks = require('helper-reflinks');

/**
 * Expose `reflinks` plugin
 */

module.exports = plugin('verb', 'reflinks');

/**
 * Append reflinks to `file.contents`
 */

function plugin(appname, name) {
  var pluginname = appname + '-' + name + ':';

  return function reflinksPlugins(locals) {
    var argv = this.get('argv');
    var app = this;

    return through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        this.push(file);
        return cb();
      }
      if (file.isStream()) {
        this.emit('error', new PluginError(pluginname, 'Streaming is not supported.'));
        return cb();
      }

      locals = locals || {};

      if (noreflinks(app, file, locals, argv)) {
        this.push(file);
        return cb();
      }

      try {
        app.union('reflinks', file.data.reflinks || []);
        var list = app.get('reflinks') || [];

        if (!list || !list.length) {
          this.push(file);
          return cb();
        }

        var stream = this;
        var str = file.contents.toString();

        reflinks(list, function (err, res) {
          if (err) {
            stream.emit('error', new PluginError(pluginname, err));
            return cb();
          }

          file.contents = new Buffer(str + res);
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
 * not to generate reflinks.
 */

function noreflinks(app, file, locals, argv) {
  return file.path.indexOf('README') === -1
    || app.isTrue('noreflinks') || app.isFalse('reflinks')
    || file.noreflinks === true || file.reflinks === false
    || locals.noreflinks === true || locals.reflinks === false
    || argv.noreflinks === true || argv.reflinks === false;
}
