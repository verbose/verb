'use strict';

var fs = require('fs');
var path = require('path');
var mm = require('micromatch');

module.exports = glob;

function glob(cwd, pattern, res) {
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
      var base = path.basename(name, path.extname(name));
      res[base] = {
        path: fp,
        content: fs.readFileSync(fp),
        data: {}
      };
    }
  }
  return res;
}
