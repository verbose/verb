'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var glob = require('globby');
var extend = require('extend-shallow');
var tutil = require('template-utils');

module.exports = function comments(patterns, options) {
  var opts = extend({sep: '\n', dest: 'README.md'}, options);
  var ctx = extend({}, this.context);

  var cwd = ctx.filepath
    ? path.dirname(ctx.filepath)
    : process.cwd();

  if (opts.dep) {
    var Lookup = require('lookup-deps');
    var lookup = new Lookup();
    var dep = lookup.paths(opts.dep);
    if (dep) {
      cwd = path.resolve(dep[opts.dep]);
    }
  }

  return glob.sync(patterns, {cwd: cwd}).map(function (fp) {
    fp = path.join(cwd, fp);

  // dest: docs/api.md
  // src: index.js

    var jscomments = require('js-comments');
    var res = jscomments(fp, opts.dest, opts);
    return tutil.headings(res);
  }).join('\n');
};
