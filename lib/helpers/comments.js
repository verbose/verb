'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var glob = require('glob');
var extend = require('extend-shallow');
var jscomments = require('js-comments');

module.exports = function comments(patterns, options) {
  var opts = extend({sep: '\n', dest: 'README.md'}, options);
  var ctx = extend({}, this.context);

  var cwd = ctx.filepath
    ? path.dirname(ctx.filepath)
    : process.cwd();

  return glob.sync(patterns, {cwd: cwd}).map(function (fp) {
    return jscomments(path.join(cwd, fp), opts.dest, opts);
  }).join('\n');
};
