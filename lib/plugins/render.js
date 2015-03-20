'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var path = require('path');
var through = require('through2');
var session = require('session-cache')('verb');
var PluginError = require('../utils/error');

module.exports = function render_(locals) {
  var verb = this;

  var id = 'task_' + (session.get('task_name'));

  locals.options = locals.options || {};
  locals = locals || {};

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('verb-plugin:render', 'Streaming is not supported.'));
      return cb();
    }

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

    var collection = verb.collection[id];

    var template = verb.views[collection][file.id];
    template.content = file.contents.toString();
    locals.options = _.extend(locals.options, verb.options);

    if (!locals.hasOwnProperty(ext)) {
      locals.ext = ext;
    }

    try {
      var stream = this;
      verb.render(template, locals, function(err, content) {
        if (err) {
          console.error(err);
          stream.emit('error', new PluginError('verb-plugin:render', err));
          cb(err);
          return;
        }

        file.contents = new Buffer(content);
        stream.push(file);
        cb();
      });

    } catch (err) {
      console.error(err);
      this.emit('error', new PluginError('verb-plugin:render', err));
      return cb();
    }
  });
};
