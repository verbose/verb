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

  verb.option('mapFiles', function (key, value, options) {
    value.options = options;
    var file = {};
    file[key] = value;
    return file;
  });

  return through.obj(function (file, enc, cb) {
    var name = file.path;
    var o = matter(file.contents.toString());

    o.options = options || {};
    o.locals = locals || {};
    o.path = name;

    // Load files as templates
    verb.files(name, o);
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