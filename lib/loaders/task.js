'use strict';

var path = require('path');

module.exports = function task_(file) {
  var template = {};
  var name = path.basename(file.path, path.extname(file.path));
  file.id = name;
  template[name] = file;
  return template;
};
