'use strict';

var fs = require('fs');
var path = require('path');
var mm = require('micromatch');
var utils = require('template-utils');
var cache = require('../cache');

module.exports = function(cwd, pattern) {
  var key = cwd + pattern;
  return cache[key] || (cache[key] = glob(cwd, pattern));
};

function glob(cwd, pattern, res) {
  if (typeof str !== 'string' || typeof pattern !== 'string') {
    throw new Error('verb/loader/glob requires a string.');
  }

  var files = fs.readdirSync(cwd);
  var len = files.length;
  res = res = {};

  var isMatch = mm.matcher(pattern);

  while (len--) {
    var name = files[len];
    var fp = path.join(cwd, name);
    if (fs.statSync(fp).isDirectory()) {
      glob(fp, pattern, res);
    } else if (isMatch(fp)) {
      var ext = path.extname(name);
      var base = path.basename(name, ext);
      res[base] = utils.toVinyl({
        ext: ext,
        dir: cwd,
        path: fp,
        basename: base,
        content: fs.readFileSync(fp),
        data: {}
      });
    }
  }
  return res;
}