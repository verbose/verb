'use strict';

var Generate = require('../../..');
var generate = new Generate();

generate.task('default', function() {});
generate.task('a', function() {});
generate.task('b', function() {});
generate.task('c', function() {});

generate.register('foo', function(app) {
  app.task('x', function() {});
  app.task('y', function() {});
  app.task('z', function() {});
});

/**
 * Expose this instance of `Generate`
 */

module.exports = generate;
