'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var through = require('through2');
var utils = require('../utils');

module.exports = function render_(locals) {
  var verb = this;
  locals = locals || {};
  locals.options = locals.options || {};

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new utils.PluginError('verb-render plugin', 'Streaming is not supported.'));
      return cb();
    }

    locals = _.merge({}, locals, file.locals);
    locals.options = _.merge({}, verb.options, locals.options);

    if (norender(verb, file.ext, file, locals)) {
      this.push(file);
      return cb();
    }

    var template = verb.getFile(file);
    template.content = file.contents.toString();

    try {
      var stream = this;
      template.render(locals, function(err, content) {
        if (err) {
          console.error(err);
          stream.emit('error', new utils.PluginError('verb/plugins/render', err));
          cb(err);
          return;
        }
        file.contents = new Buffer(content);
        stream.push(file);
        return cb();
      });

    } catch (err) {
      console.error(err);
      this.emit('error', new utils.PluginError('verb/plugins/render', err));
      return cb();
    }
  });
};

/**
 * Push the `file` through if the user has specfied
 * not to render it.
 */

function norender(app, ext, file, locals) {
  return !app.engines.hasOwnProperty(ext)
    || app.isTrue('norender')
    || app.isFalse('render')
    || file.norender === true
    || file.render === false
    || locals.norender === true
    || locals.render === false;
}
