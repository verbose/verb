'use strict';

var path = require('path');

module.exports = function(app) {
  app.task('default', function(cb) {
    console.log('fixtures/a > default');
    cb();
  });
};
