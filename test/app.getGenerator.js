'use strict';

var path = require('path');
var assert = require('assert');
var Verb = require('..');
var verb;

var fixtures = path.resolve.bind(path, __dirname + '/fixtures');

describe('.generator', function() {
  beforeEach(function() {
    verb = new Verb();
  });

  it('should get a generator from the verb instance', function() {
    verb.register('abc', function() {});
    var generator = verb.getGenerator('abc');
    assert(generator);
    assert.equal(typeof generator, 'object');
    assert.equal(generator.name, 'abc');
  });

  it('should get a generator from the verb instance from a nested generator', function() {
    verb.register('abc', function() {});
    verb.register('xyz', function(app) {
      app.register('sub', function(sub) {
        var generator = verb.getGenerator('abc');
        assert(generator);
        assert.equal(typeof generator, 'object');
        assert.equal(generator.name, 'abc');
      });
    });
    verb.getGenerator('xyz');
  });

  it('should get a generator from the verb instance using `this`', function() {
    verb.register('abc', function() {});
    verb.register('xyz', function(app) {
      app.register('sub', function(sub) {
        var generator = this.getGenerator('abc');
        assert(generator);
        assert.equal(typeof generator, 'object');
        assert.equal(generator.name, 'abc');
      });
    });
    verb.getGenerator('xyz');
  });

  it('should get a verb generator from "app" from a nested generator', function() {
    verb.register('abc', function() {});
    verb.register('xyz', function(app) {
      app.register('sub', function(sub) {
        var generator = app.getGenerator('abc');
        assert(generator);
        assert.equal(typeof generator, 'object');
        assert.equal(generator.name, 'abc');
      });
    });
    verb.getGenerator('xyz');
  });

  it('should get a nested generator', function() {
    verb.register('abc', function(abc) {
      abc.register('def', function() {});
    });

    var generator = verb.getGenerator('abc.def');
    assert(generator);
    assert.equal(typeof generator, 'object');
    assert.equal(generator.name, 'def');
  });

  it('should get a deeply nested generator', function() {
    verb.register('abc', function(abc) {
      abc.register('def', function(def) {
        def.register('ghi', function(ghi) {
          ghi.register('jkl', function(jkl) {
            jkl.register('mno', function() {});
          });
        });
      });
    });

    var generator = verb.getGenerator('abc.def.ghi.jkl.mno');
    assert(generator);
    assert.equal(typeof generator, 'object');
    assert.equal(generator.name, 'mno');
  });

  it('should get a generator that was registered by path', function() {
    verb.register('a', fixtures('generators/a'));
    var generator = verb.getGenerator('a');
    assert(generator);
    assert(generator.tasks);
    assert(generator.tasks.hasOwnProperty('default'));
  });
});
