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

  var _name_ = 'task_' + (session.get('task_name'));
  verb.create(_name_, verb.option('defaults'), [function (file, next) {
    var o = {};
    o[file.path] = file;
    next(null, o);
  }], function (err) {
    if (err) console.log(err);
  });

  return through.obj(function (file, enc, cb) {
    var name = file.path;
    var o = matter(file.contents.toString());

    o.options = options || {};
    o.locals = locals || {};
    o.path = name;

    verb[_name_](o);
    cb();
  }, function (cb) {
    var stream = this;

    var plural = verb.subtype[_name_];

    _.forIn(verb.cache[plural], function (value) {
      value = verb.toVinyl(value);
      stream.push(value);
    });

    cb();
  });
};