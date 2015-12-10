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

  verb.preLayout(/\.md/, function(file, next) {
    if (file.options.viewType.indexOf('partial') > -1) {
      return next();
    }
    if (needsLayout(file.content) && typeof file.layout !== 'string') {
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
