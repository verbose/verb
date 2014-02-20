var path = require('path');
var file = require('fs-utils');

module.exports = function(location, patterns) {
  location = path.relative(process.cwd(), location);
  var files = file.expand('*'+patterns+'*', {cwd: location});

  return files.map(function(filepath) {
    return file.normalizeSlash(path.resolve(location, filepath));
  });
};