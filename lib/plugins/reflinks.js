'use strict';

var through = require('through2');
var PluginError = require('plugin-error');
var reflinks = require('helper-reflinks');
var extend = require('extend-shallow');

/**
 * Expose `reflinks` plugin
 */

module.exports = function(options) {
  options = options || {};
  var config = this.config.get('reflinks');
  var argv = this.get('argv');
  var app = this;

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (!enabled(app, file, options, argv, config)) {
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
          stream.emit('error', new PluginError('reflinks plugin', err));
          return cb();
        }

        file.contents = new Buffer(str + '\n' + res);
        stream.push(file);
        return cb();
      });

    } catch (err) {
      this.emit('error', new PluginError('reflinks plugin', err));
      return cb();
    }
  });
};

/**
 * Push the `file` through if the user has specfied
 * not to generate reflinks.
 */

function enabled(app, file, options, argv, config) {
  var template = extend({}, file.locals, file.options, file.data);

  return file.path.indexOf('README') === -1
    || config.noreflinks === true || config.reflinks === false
    || app.isTrue('noreflinks') || app.isFalse('reflinks')
    || argv.noreflinks === true || argv.reflinks === false
    || options.noreflinks === true || options.reflinks === false
    || template.noreflinks === true || template.reflinks === false;
}
