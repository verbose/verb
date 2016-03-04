'use strict';

module.exports = function(app) {
  app.task('default', function(cb) {
    console.log('c > default');
    cb();
  });
  app.task('c_a', function(cb) {
    console.log('c > a');
    cb();
  });
  app.task('c_b', function(cb) {
    console.log('c > b');
    cb();
  });
  app.task('c_c', function(cb) {
    console.log('c > c');
    cb();
  });

  app.register('docs', function(docs, base) {
    docs.task('default', function(cb) {
      console.log('c > x');
      cb();
    });
    docs.task('c_x', function(cb) {
      console.log('c > x');
      cb();
    });
    docs.task('c_y', function(cb) {
      console.log('c > y');
      cb();
    });
    docs.task('c_z', function(cb) {
      console.log('c > z');
      cb();
    });
  });
};
