'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var mm = require('micromatch');
var relative = require('relative');
var _ = require('lodash');
var utils = require('./');

module.exports = function(patterns, options) {
  patterns = (patterns && patterns.length) || ['**/*.js', '.verb.md'];
  var opts = _.extend({dot: true}, options);
  return lookup(opts.cwd, _.uniq(patterns), opts.ignore);
};

function lookup (dir, patterns, ignore) {
  var files = utils.tryReaddir(dir);
  var len = files.length, i = 0;
  var res = [];

  while (len--) {
    var name = files[i++];
    var fp = path.resolve(dir, name);
    if (contains(relative(fp), ignore)) continue;

    if (fs.statSync(fp).isDirectory()) {
      res.push.apply(res, lookup(fp, patterns, ignore));
    } else if (!patterns || mm.any(name, patterns)) {
      res.push(relative(fp));
    }
  }
  return res;
}

function contains(fp, patterns) {
  var len = patterns.length;
  while (len--) {
    if (mm.contains(fp, patterns[len])) {
      return true;
    }
  }
  return false;
}
