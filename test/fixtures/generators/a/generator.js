'use strict';

module.exports = function(app) {
  app.task('default', function(cb) {
    console.log('fixtures/a > default');
    cb();
  });
};
