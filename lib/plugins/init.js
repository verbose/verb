'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var session = require('session-cache')('verb');
var tutil = require('template-utils');
var forIn = require('for-in');

module.exports = function init() {
  var verb = this;

  var _name_ = 'task_' + (session.get('task_name'));

  // create a custom template type based on the task name, to cache source files.
  if (!verb.hasOwnProperty(_name_)) {
    verb.create(_name_, verb.option('defaults'), function (file) {
      var template = {};
      var name = path.basename(file.path, path.extname(file.path));
      file.options = file.options || {};
      file.options.key = name;
      template[name] = file;
      return template;
    });
  }

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      var err = new gutil.PluginError('verb-plugin:init', 'Streaming is not supported.');
      this.emit('error', err);
      return cb();
    }

    // Convert vinyl file into an verb template and add to a collection
    verb[_name_](tutil.toTemplate(file));
    cb();
  }, function (cb) {
    var plural = verb.collection[_name_];

    // push all the templates from the current collection into
    // the stream this lets other plugins do processing on the
    // templates before rendering.
    forIn(verb.views[plural], function (value) {
      value = tutil.toVinyl(value);
      this.push(value);
    }, this);

    cb();
  });
};
