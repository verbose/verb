'use strict';

var path = require('path');
var glob = require('glob');

module.exports = function(patterns, fn) {
  return glob.sync(patterns, {cwd: process.cwd()}).map(function (fp) {
    return typeof fn === 'function'
      ? fn(path.join(cwd, fp))
      : path.join(cwd, fp);
  });
};
