'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var path = require('path');
var through = require('through2');
var matter = require('gray-matter');

/**
 * Inject files into the pipeline.
 */

module.exports = function init(locals, options) {
  var verb = this;

  return through.obj(function (file, enc, cb) {
    var name = path.basename(file.path);
    var o = matter(file.contents.toString());

    file.orig = o.orig;
    file.data = o.data;
    file.locals = locals;
    file.options = options;
    file.content = o.content;

    verb.files(name, file);

    cb();
  }, function (cb) {
    var stream = this;

    _.forIn(verb.cache.files, function (value) {
      value = verb.toVinyl(value);
      stream.push(value);
    });

    cb();
  });
};