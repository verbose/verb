'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Verb = require('..');
var verb;

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');

describe('.generator', function() {
  beforeEach(function() {
    verb = new Verb();
    verb.initVerb({});
  });

  describe('register > function', function() {
    it('should register a generator function by name', function() {
      verb.generator('foo', function() {});
      assert(verb.generators.hasOwnProperty('foo'));
    });

    it('should register a generator function by alias', function() {
      verb.generator('verb-generate-abc', function() {});
      assert(verb.generators.hasOwnProperty('abc'));
    });
  });

  describe('get > alias', function() {
    it('should get a generator by alias', function() {
      verb.generator('verb-generate-abc', function() {});
      var abc = verb.generator('abc');
      assert(abc);
      assert.equal(typeof abc, 'object');
    });
  });

  describe('get > name', function() {
    it('should get a generator by name', function() {
      verb.generator('verb-generate-abc', function() {});
      var abc = verb.generator('verb-generate-abc');
      assert(abc);
      assert.equal(typeof abc, 'object');
    });
  });

  describe('generators', function() {
    it('should invoke a registered generator when `getGenerator` is called', function(cb) {
      verb.register('foo', function(app) {
        app.task('default', function() {});
        cb();
      });
      verb.getGenerator('foo');
    });

    it('should expose an app\'s generators on app.generators', function(cb) {
      verb.register('foo', function(app) {
        app.register('a', function() {});
        app.register('b', function() {});

        app.generators.hasOwnProperty('a');
        app.generators.hasOwnProperty('b');
        cb();
      });

      verb.getGenerator('foo');
    });

    it('should expose all root generators on verb.generators', function(cb) {
      verb.register('foo', function(app, b) {
        b.generators.hasOwnProperty('foo');
        b.generators.hasOwnProperty('bar');
        b.generators.hasOwnProperty('baz');
        cb();
      });

      verb.register('bar', function(app, verb) {});
      verb.register('baz', function(app, verb) {});
      verb.getGenerator('foo');
    });
  });

  describe('cross-generators', function() {
    it('should get a generator from another generator', function(cb) {
      verb.register('foo', function(app, b) {
        var bar = b.getGenerator('bar');
        assert(bar);
        cb();
      });

      verb.register('bar', function(app, verb) {});
      verb.register('baz', function(app, verb) {});
      verb.getGenerator('foo');
    });

    it('should set options on another generator instance', function(cb) {
      verb.generator('foo', function(app) {
        app.task('default', function(next) {
          assert.equal(app.option('abc'), 'xyz');
          next();
        });
      });

      verb.generator('bar', function(app, b) {
        var foo = b.getGenerator('foo');
        foo.option('abc', 'xyz');
        foo.build(function(err) {
          if (err) return cb(err);
          cb();
        });
      });
    });
  });

  describe('generators > filepath', function() {
    it('should register a generator function from a file path', function() {
      var one = verb.generator('one', fixtures('one/verbfile.js'));
      assert(verb.generators.hasOwnProperty('one'));
      assert(typeof verb.generators.one === 'object');
      assert.deepEqual(verb.generators.one, one);
    });

    it('should register a Verb instance from a file path', function() {
      var two = verb.generator('two', fixtures('two/verbfile.js'));
      assert(verb.generators.hasOwnProperty('two'));
      assert(typeof verb.generators.two === 'object');
      assert.deepEqual(verb.generators.two, two);
    });

    it('should get a registered generator by name', function() {
      var one = verb.generator('one', fixtures('one/verbfile.js'));
      assert.deepEqual(verb.generator('one'), one);
    });
  });

  describe('tasks', function() {
    it('should expose a generator\'s tasks on app.tasks', function(cb) {
      verb.register('foo', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        assert(app.tasks.a);
        assert(app.tasks.b);
        cb();
      });

      verb.getGenerator('foo');
    });

    it('should get tasks from another generator', function(cb) {
      verb.register('foo', function(app, b) {
        var baz = b.getGenerator('baz');
        var task = baz.tasks.aaa;
        assert(task);
        cb();
      });

      verb.register('bar', function(app, verb) {});
      verb.register('baz', function(app, verb) {
        app.task('aaa', function() {});
      });
      verb.getGenerator('foo');
    });
  });
});
