'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var path = require('path');
var through = require('through2');
var matter = require('gray-matter');
var session = require('../session');

/**
 * Inject files into the pipeline.
 */

module.exports = function init(locals, options) {
  var verb = this;

  verb.option('mapFiles', function (key, value, options) {
    value.options = options;
    var file = {};
    file[key] = value;
    return file;
  });

  var _name_ = 'task_' + (session.get('task_name'));
  verb.create(_name_, verb.option('defaults'));

  return through.obj(function (file, enc, cb) {
    var name = file.path;
    var o = matter(file.contents.toString());

    o.options = options || {};
    o.locals = locals || {};
    o.path = name;

    verb[_name_](name, o);
    cb();
  }, function (cb) {
    var stream = this;

    _.forIn(verb.cache[_name_ + 's'], function (value) {
      value = verb.toVinyl(value);
      stream.push(value);
    });

    cb();
  });
};