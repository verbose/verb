'use strict';

var Verb = require('../..');
var verb = new Verb();

verb.task('default', function() {});
verb.task('a', function() {});
verb.task('b', function() {});
verb.task('c', function() {});

verb.register('foo', function(app) {
  app.task('x', function() {});
  app.task('y', function() {});
  app.task('z', function() {});
});

/**
 * Expose this instance of `Verb`
 */

module.exports = verb;