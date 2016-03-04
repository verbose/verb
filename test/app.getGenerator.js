'use strict';

var path = require('path');
var assert = require('assert');
var Generate = require('..');
var generate

var fixtures = path.resolve.bind(path, __dirname + '/fixtures');

describe('.generator', function() {
  beforeEach(function() {
    generate = new Generate();
  });

  it('should get a generator from the base instance', function() {
    generate.register('abc', function() {});
    var generator = generate.getGenerator('abc');
    assert(generator);
    assert.equal(typeof generator, 'object');
    assert.equal(generator.name, 'abc');
  });

  it('should get a generator from the base instance from a nested generator', function() {
    generate.register('abc', function() {});
    generate.register('xyz', function(app) {
      app.register('sub', function(sub) {
        var generator = generate.getGenerator('abc');
        assert(generator);
        assert.equal(typeof generator, 'object');
        assert.equal(generator.name, 'abc');
      });
    });
    generate.getGenerator('xyz');
  });

  it('should get a generator from the base instance using `this`', function() {
    generate.register('abc', function() {});
    generate.register('xyz', function(app) {
      app.register('sub', function(sub) {
        var generator = this.getGenerator('abc');
        assert(generator);
        assert.equal(typeof generator, 'object');
        assert.equal(generator.name, 'abc');
      });
    });
    generate.getGenerator('xyz');
  });

  it('should get a base generator from "app" from a nested generator', function() {
    generate.register('abc', function() {});
    generate.register('xyz', function(app) {
      app.register('sub', function(sub) {
        var generator = app.getGenerator('abc');
        assert(generator);
        assert.equal(typeof generator, 'object');
        assert.equal(generator.name, 'abc');
      });
    });
    generate.getGenerator('xyz');
  });

  it('should get a nested generator', function() {
    generate.register('abc', function(abc) {
      abc.register('def', function() {});
    });

    var generator = generate.getGenerator('abc.def');
    assert(generator);
    assert.equal(typeof generator, 'object');
    assert.equal(generator.name, 'def');
  });

  it('should get a deeply nested generator', function() {
    generate.register('abc', function(abc) {
      abc.register('def', function(def) {
        def.register('ghi', function(ghi) {
          ghi.register('jkl', function(jkl) {
            jkl.register('mno', function() {});
          });
        });
      });
    });

    var generator = generate.getGenerator('abc.def.ghi.jkl.mno');
    assert(generator);
    assert.equal(typeof generator, 'object');
    assert.equal(generator.name, 'mno');
  });

  it('should get a generator that was registered by path', function() {
    generate.register('a', fixtures('generators/a'));
    var generator = generate.getGenerator('a');
    assert(generator);
    assert(generator.tasks);
    assert(generator.tasks.hasOwnProperty('default'));
  });
});
