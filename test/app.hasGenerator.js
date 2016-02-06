'use strict';

require('mocha');
var assert = require('assert');
var Generate = require('..');
var generate;

describe('.hasGenerator', function() {
  beforeEach(function() {
    generate = new Generate();
  });

  it('should return true if a generator is registered', function() {
    generate.register('foo', function(app) {
    });
    assert(generate.hasGenerator('foo'));
  });

  it('should return false if a generator is not registered', function() {
    generate.register('foo', function(app) {
      app.register('bar', function() {});
    });

    assert(!generate.hasGenerator('bar'));
  });

  it('should return false if a sub-generator is registered', function() {
    generate.register('foo', function(app) {
      app.register('bar', function() {});
    });

    assert(generate.hasGenerator('foo.bar'));
  });

  it('should return false if a sub-generator is not registered', function() {
    generate.register('foo', function(app) {
      app.register('bar', function() {});
    });

    assert(!generate.hasGenerator('foo.baz'));
    assert(!generate.hasGenerator('foo.bar.baz'));
  });
});
