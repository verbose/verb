'use strict';

var utils = require('../utils');

module.exports = function(verb, base, env) {
  verb.onLoad(/\.verb\.md/, function(file, next) {
    file.path = 'readme.md';
    file.dest = 'readme.md';
    next();
  });

  verb.preRender(/\.md/, function(file, next) {
    if (file.options.viewType.indexOf('partial') > -1) {
      return next();
    }
    utils.toc(verb)(file, next);
  });

  verb.preWrite(/package\.json$/, function(file, next) {
    file.dest = 'package.json';
    next();
  });

  verb.preLayout(/\.md/, function(file, next) {
    if (file.options.viewType.indexOf('partial') > -1) {
      return next();
    }

    // working on a better method for this!
    var layout = verb.get('env.user.pkg.verb.layout');
    if (typeof layout !== 'undefined') {
      file.layout = layout;
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
