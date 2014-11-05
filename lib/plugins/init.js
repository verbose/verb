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

    var template = {};
    template[file.path] = file;
    next(null, template);

  }], function (err) {
    if (err) console.log(err);
  });

  return through.obj(function (file, enc, cb) {
    var filepath = file.path;
    var template = matter(file.contents.toString());

    template.options = options || {};
    template.locals = locals || {};
    template.path = filepath;
    verb[_name_](template);

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