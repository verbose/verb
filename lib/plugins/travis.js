'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var writeYaml = require('write-yaml');
var session = require('../session');

/**
 * Inject files into the pipeline.
 */

module.exports = function travis(locals, options) {
  var verb = this;

  return through.obj(function (file, enc, cb) {
    cb();
  }, function (cb) {
    var travis = verb.get('data', 'travis');
    var isTravis = Boolean(travis);

    if (isTravis) {
      writeYaml('.travis2.yml', travis);
    }
  });
};