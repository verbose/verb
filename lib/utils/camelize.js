'use strict';

var path = require('path');

module.exports = function camelize(fp) {
  var str = path.basename(fp, path.extname(fp));
  return str.replace(/-(.)/g, function (_, s) {
    return s.toUpperCase();
  });
};
