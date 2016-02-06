'use strict';


module.exports = function(app, base, env) {
  app.task('default', function(cb) {
    console.log('one > default');
    cb();
  });

  app.task('a', function() {});
  app.task('b', function() {});
  app.task('c', function() {});

  app.register('foo', function(app) {
    app.task('x', function() {});
    app.task('y', function() {});
    app.task('z', function() {});
  });
};