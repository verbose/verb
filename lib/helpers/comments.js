'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var extend = require('extend-shallow');
var jscomments = require('js-comments');

module.exports = function comments(patterns, options) {
  var opts = extend({sep: '\n', dest: 'README.md'}, options);

  var cwd = process.cwd();
  if (this.context && this.context.filepath) {
    cwd = path.dirname(this.context.filepath);
  }

  return glob.sync(patterns, {cwd: cwd}).map(function (fp) {
    return jscomments(path.join(cwd, fp), opts.dest, opts);
  }).join('\n');
};
