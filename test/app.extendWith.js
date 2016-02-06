'use strict';

require('mocha');
require('generate-foo/verbfile.js');
var assert = require('assert');
var Generate = require('..');
var generate;

describe('.extendWith', function() {
  beforeEach(function() {
    generate = new Generate();
  });

  it('should get a named generator', function(cb) {
    generate.register('foo', function(app) {
      app.extendWith('bar');
      cb();
    });

    generate.register('bar', function(app) {
      app.task('a', function() {});
      app.task('b', function() {});
      app.task('c', function() {});
    });

    generate.getGenerator('foo');
  });

  it('should extend a generator with a named generator', function(cb) {
    generate.register('foo', function(app) {
      assert(!app.tasks.a);
      assert(!app.tasks.b);
      assert(!app.tasks.c);

      app.extendWith('bar');
      assert(app.tasks.a);
      assert(app.tasks.b);
      assert(app.tasks.c);
      cb();
    });

    generate.register('bar', function(app) {
      app.task('a', function() {});
      app.task('b', function() {});
      app.task('c', function() {});
    });

    generate.getGenerator('foo');
  });

  it('should extend a generator with an array of generators', function(cb) {
    generate.register('foo', function(app) {
      assert(!app.tasks.a);
      assert(!app.tasks.b);
      assert(!app.tasks.c);

      app.extendWith(['bar', 'baz', 'qux']);
      assert(app.tasks.a);
      assert(app.tasks.b);
      assert(app.tasks.c);
      cb();
    });

    generate.register('bar', function(app) {
      app.task('a', function() {});
    });

    generate.register('baz', function(app) {
      app.task('b', function() {});
    });

    generate.register('qux', function(app) {
      app.task('c', function() {});
    });

    generate.getGenerator('foo');
  });
});
