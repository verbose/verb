'use strict';

module.exports = function(generate, base) {
  generate.task('default', function() {});
  generate.task('a', function() {});
  generate.task('b', function() {});
  generate.task('c', function() {});

  generate.register('foo', function(app) {
    app.task('x', function() {});
    app.task('y', function() {});
    app.task('z', function() {});
  });
};