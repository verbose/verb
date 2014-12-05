'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var glob = require('globby');
var async = require('async');
var extend = require('extend-shallow');

module.exports = function(patterns, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = extend({sep: '\n'}, options);

  glob(patterns, options, function(err, files) {
    async.mapSeries(files, function(fp, next) {
      fs.readFile(fp, 'utf8', next);
    }, function (err, arr) {
      if (err) return cb(err);
      cb(null, arr.join(opts.sep));
    });
  });
};