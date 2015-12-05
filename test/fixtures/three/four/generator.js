'use strict';

module.exports = function(verb, base) {
  verb.task('default', function() {});
  verb.task('a', function() {});
  verb.task('b', function() {});
  verb.task('c', function() {});

  verb.register('foo', function(app) {
    app.task('x', function() {});
    app.task('y', function() {});
    app.task('z', function() {});
  });
};