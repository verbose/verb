'use strict';

var through = require('through2');
var PluginError = require('plugin-error');
var reflinks = require('helper-reflinks');
var extend = require('extend-shallow');
var isTrue = require('is-true');

/**
 * Expose `reflinks` plugin
 */

module.exports = function(options) {
  options = options || {};
  var config = this.config && this.config.get('reflinks') || {};
  var argv = this.get('argv');
  var app = this;

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    var disabled = !enabled(app, file, options, argv, config);
    if (disabled || !config) {
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

function enabled(app, file, options, argv) {
  var template = extend({}, file.locals, file.options, file.data);
  return isTrue(argv, 'reflinks')
    || isTrue(template, 'reflinks')
    || isTrue(options, 'reflinks')
    || isTrue(app.options, 'reflinks');
}
