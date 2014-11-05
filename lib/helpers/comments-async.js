'use strict';

var fs = require('fs');
var glob = require('glob');
var async = require('async');
var extend = require('extend-shallow');
var jscomments = require('js-comments');


module.exports = function(patterns, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = extend({sep: '\n', dest: 'README.md'}, options);

  glob(patterns, options, function(err, files) {
    async.mapSeries(files, function(fp, next) {
      next(null, jscomments(fp, opts.dest, opts));
    }, function (err, arr) {
      if (err) return cb(err);
      cb(null, arr.join('\n'));
    });
  });
};