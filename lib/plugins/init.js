'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var gutil = require('gulp-util');
var through = require('through2');
var matter = require('gray-matter');
var session = require('../session');

module.exports = function init(locals, options) {
  var verb = this;

  var _name_ = 'task_' + (session.get('task_name'));

  // create a custom template type based on the task name to keep
  // source files separate.
  verb.create(_name_, verb.option('defaults'), [function (file, next) {
    var template = {};
    template[file.path] = file;
    next(null, template);
  }], function (err) {
    if (err) console.log(err);
  });

  return through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      var err = new gutil.PluginError('verb-plugin:init', 'Streaming is not supported.');
      this.emit('error', err);
      return cb();
    }

    var filepath = file.path;
    var template = matter(file.contents.toString());

    template.options = options || {};
    template.locals = locals || {};
    template.path = filepath;

    // Add files to template cache
    verb[_name_](template);

    cb();
  }, function (cb) {
    var plural = verb.subtype[_name_];

    // push all the templates on the current fileType cache into the stream
    // this lets other plugins do processing on the templates before rendering.
    var stream = this;
    _.forIn(verb.cache[plural], function (value) {
      value = verb.toVinyl(value);
      stream.push(value);
    });

    cb();
  });
};