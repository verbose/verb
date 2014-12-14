'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var writeYaml = require('write-yaml');

/**
 * Inject files into the pipeline.
 */

module.exports = function travis(/*locals*/) {
  var verb = this;

  return through.obj(function (file, enc, cb) {
    this.push(file);
    cb();
  }, function (cb) {
    var travis = verb.get('data.travis');
    var isTravis = Boolean(travis);

    if (isTravis) {
      writeYaml('.travis2.yml', travis);
    }
    cb();
  });
};
