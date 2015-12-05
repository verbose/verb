'use strict';

var utils = require('./utils');

module.exports = function(app, base, env) {
  app.on('error', function(err) {
    console.log(err.stack);
  });

  app.onLoad(/\.verb\.md/, function(file, next) {
    file.path = 'readme.md';
    next();
  });

  app.preLayout(/(\.verb|readme)\.md/i, function(file, next) {
    if (needsLayout(file.content)) {
      file.layout = 'default';
    }
    next();
  });
};

function needsLayout(str) {
  if (!/^# /.test(str)) {
    return true;
  }
  return false;
}
