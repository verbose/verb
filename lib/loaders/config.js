'use strict';

var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var files = ['bower.json', 'package.json', '.travis.yml', '.jshintrc'];

module.exports = function config(arr) {
  var len = arr.length;
  var res = {};

  while (len--) {
    var fp = path.resolve(files[len]);
    if (fs.existsSync(fp)) {
      var name = path.basename(fp, path.extname(fp));
      if (name.charAt(0) === '.') {
        name = name.slice(1);
      }

      var str = fs.readFileSync(fp, 'utf8');
      if (fp.indexOf('yml') !== -1) {
        res[name] = yaml.load(str);
      } else {
        res[name] = JSON.parse(str);
      }
    }
  }
  return res;
};