'use strict';

var path = require('path');

module.exports = function(app, base) {
  return function(val, key, config, next) {
    if (typeof val === 'undefined') {
      config[key] = app.cwd;
    } else {
      config[key] = path.resolve(val);
    }
    next();
  }
};
