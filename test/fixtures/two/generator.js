'use strict';

var Base = require('../../..');
var base = new Base();

base.task('default', function() {});
base.task('a', function() {});
base.task('b', function() {});
base.task('c', function() {});

base.register('foo', function(app) {
  app.task('x', function() {});
  app.task('y', function() {});
  app.task('z', function() {});
});

/**
 * Expose this instance of `Generate`
 */

module.exports = base;
