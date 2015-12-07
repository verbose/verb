'use strict';

var utils = require('../utils');

module.exports = function(verb, base, env) {
  verb.preRender(/\.md/, function(file, next) {
    verb.option('toc.noinsert', true);
    utils.toc(verb)(file, next);
  });

  verb.onLoad(/\.verb\.md/, function(file, next) {
    file.path = 'readme.md';
    next();
  });

  verb.preLayout(/(\.verb|readme)\.md/i, function(file, next) {
    if (needsLayout(file.content)) {
      file.layout = 'default';
    }
    next();
  });
};

// placeholder
function needsLayout(str) {
  if (!/^# /.test(str)) {
    return true;
  }
  return false;
}
