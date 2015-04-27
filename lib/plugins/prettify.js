'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var PluginError = require('plugin-error');
var Remarkable = require('remarkable');
var prettify = require('pretty-remarkable');
var _ = require('lodash');

module.exports = plugin('verb', 'format');

/**
 * Apply basic formatting to markdown
 */

function plugin(appname, name, config) {
  var pluginname = appname + '-' + name + ':';

  return function prettify_(locals) {
    locals = _.extend({}, config, locals);
    var app = this;
    var argv = app.get('argv');

    return through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        this.push(file);
        return cb();
      }
      if (file.isStream()) {
        this.emit('error', new PluginError(pluginname, 'Streaming is not supported.'));
        return cb();
      }

      if (file.path.indexOf('README.md') === -1 || noformat(app, file, locals, argv)) {
        this.push(file);
        return cb();
      }

      var opts = _.extend({}, locals, file.options);
      opts.username = app.get('data.username');
      opts.name = app.get('data.author.name');

      var str = pretty(file.contents.toString(), opts);
      file.contents = new Buffer(str);
      this.push(file);
      return cb();
    });
  };
}

function pretty(str, options) {
  return new Remarkable(options)
    .use(prettify)
    .render(str);
}

/**
 * Push the `file` through if the user has specfied
 * not to format it.
 */

function noformat(app, file, locals, argv) {
  return app.isTrue('noformat') || app.isFalse('format')
    || file.noformat === true || file.format === false
    || locals.noformat === true || locals.format === false
    || argv.noformat === true || argv.format === false;
}
