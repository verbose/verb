'use strict';

var path = require('path');

module.exports = function task_(file) {
  var name = path.basename(file.path, path.extname(file.path));
  file.content = file.contents.toString();
  file.id = name;
  var template = {};
  template[name] = file;
  return template;
};
