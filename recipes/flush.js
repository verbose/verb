'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var path = require('path');
var through = require('through2');

module.exports = function flush(options) {
  var verb = this;

  return through.obj(function (file, enc, cb) {

    this.push(file);
    cb();
  }, function (cb) {

    // do stuff
    cb();
  });
};