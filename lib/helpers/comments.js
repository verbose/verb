'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var glob = require('globby');
var async = require('async');
var extend = require('extend-shallow');
var tutil = require('template-utils');

module.exports = function comments(patterns, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = extend({sep: '\n', dest: 'README.md'}, options);
  var ctx = extend({}, this.context);
  var dest = path.resolve(ctx.dest || opts.dest);
  var render = this.app.renderString;

  opts.cwd = ctx.filepath
    ? path.dirname(ctx.filepath)
    : process.cwd();

  glob(patterns, opts, function(err, files) {
    async.mapSeries(files, function(fp, next) {
      var jscomments = require('js-comments');
      var res = jscomments(fp, dest, opts);
      next(null, tutil.headings(res));
    }, function (err, arr) {
      if (err) return cb(err);
      cb(null, arr.join('\n'));
    });
  });
};