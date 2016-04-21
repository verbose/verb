'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Generate = require('..');
var generate;

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');

describe('app.generator', function() {
  beforeEach(function() {
    generate = new Generate();
  });

  describe('get generator', function() {
    it('should get a generator by full name name', function() {
      var gen = generate.getGenerator('generate-mocha');
      assert(gen);
      assert.equal(gen.env.alias, 'mocha');
      assert.equal(gen.env.name, 'generate-mocha');
    });

    it('should get a generator by aliased name', function() {
      var gen = generate.getGenerator('generate-mocha');
      assert(gen);
      assert.equal(gen.env.alias, 'mocha');
      assert.equal(gen.env.name, 'generate-mocha');
    });

    it('should get a generator by alias', function() {
      var gen = generate.getGenerator('generate-mocha');
      assert(gen);
      assert.equal(gen.env.alias, 'mocha');
      assert.equal(gen.env.name, 'generate-mocha');
    });
  });

  describe('register > function', function() {
    it('should register a generator function by name', function() {
      generate.generator('foo', function() {});
      assert(generate.generators.hasOwnProperty('foo'));
    });

    it('should register a generator function by alias', function() {
      generate.generator('generate-abc', function() {});
      assert(generate.generators.hasOwnProperty('generate-abc'));
    });
  });

  describe('get > alias', function() {
    it('should get a generator by alias', function() {
      generate.generator('generate-abc', function() {});
      var abc = generate.generator('abc');
      assert(abc);
      assert.equal(typeof abc, 'object');
    });
  });

  describe('get > name', function() {
    it('should get a generator by name', function() {
      generate.generator('generate-abc', function() {});
      var abc = generate.generator('generate-abc');
      assert(abc);
      assert.equal(typeof abc, 'object');
    });
  });

  describe('generators', function() {
    it('should invoke a registered generator when `getGenerator` is called', function(cb) {
      generate.register('foo', function(app) {
        app.task('default', function() {});
        cb();
      });
      generate.getGenerator('foo');
    });

    it('should expose the generator instance on `app`', function(cb) {
      generate.register('foo', function(app) {
        app.task('default', function(next) {
          assert.equal(app.get('a'), 'b');
          next();
        })
      });

      var foo = generate.getGenerator('foo');
      foo.set('a', 'b');
      foo.build('default', function(err) {
        if (err) return cb(err);
        cb()
      });
    });

    it('should expose the "base" instance on `base`', function(cb) {
      generate.set('x', 'z');
      generate.register('foo', function(app, base) {
        app.task('default', function(next) {
          assert.equal(generate.get('x'), 'z');
          next();
        })
      });

      var foo = generate.getGenerator('foo');
      foo.set('a', 'b');
      foo.build('default', function(err) {
        if (err) return cb(err);
        cb()
      });
    });

    it('should expose the "env" object on `env`', function(cb) {
      generate.register('foo', function(app, base, env) {
        app.task('default', function(next) {
          assert.equal(env.alias, 'foo');
          next();
        })
      });

      generate.getGenerator('foo').build('default', function(err) {
        if (err) return cb(err);
        cb()
      });
    });

    it('should expose an app\'s generators on app.generators', function(cb) {
      generate.register('foo', function(app) {
        app.register('a', function() {});
        app.register('b', function() {});

        app.generators.hasOwnProperty('a');
        app.generators.hasOwnProperty('b');
        cb();
      });

      generate.getGenerator('foo');
    });

    it('should expose all root generators on generate.generators', function(cb) {
      generate.register('foo', function(app, b) {
        b.generators.hasOwnProperty('foo');
        b.generators.hasOwnProperty('bar');
        b.generators.hasOwnProperty('baz');
        cb();
      });

      generate.register('bar', function(app, base) {});
      generate.register('baz', function(app, base) {});
      generate.getGenerator('foo');
    });
  });

  describe('cross-generators', function() {
    it('should get a generator from another generator', function(cb) {
      generate.register('foo', function(app, b) {
        var bar = b.getGenerator('bar');
        assert(bar);
        cb();
      });

      generate.register('bar', function(app, base) {});
      generate.register('baz', function(app, base) {});
      generate.getGenerator('foo');
    });

    it('should set options on another generator instance', function(cb) {
      generate.generator('foo', function(app) {
        app.task('default', function(next) {
          assert.equal(app.option('abc'), 'xyz');
          next();
        });
      });

      generate.generator('bar', function(app, b) {
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
      var one = generate.generator('one', fixtures('one/verbfile.js'));
      assert(generate.generators.hasOwnProperty('one'));
      assert(typeof generate.generators.one === 'object');
      assert.deepEqual(generate.generators.one, one);
    });

    it('should register an instance from a file path', function() {
      var two = generate.generator('two', fixtures('two/generator.js'));
      assert(generate.generators.hasOwnProperty('two'));
      assert(typeof generate.generators.two === 'object');
      assert.deepEqual(generate.generators.two, two);
    });

    it('should get a registered generator by name', function() {
      var one = generate.generator('one', fixtures('one/generator.js'));
      var two = generate.generator('two', fixtures('two/generator.js'));
      assert.deepEqual(generate.generator('one'), one);
      assert.deepEqual(generate.generator('two'), two);
    });
  });

  describe('tasks', function() {
    it('should expose a generator\'s tasks on app.tasks', function(cb) {
      generate.register('foo', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        assert(app.tasks.a);
        assert(app.tasks.b);
        cb();
      });

      generate.getGenerator('foo');
    });

    it('should get tasks from another generator', function(cb) {
      generate.register('foo', function(app, b) {
        var baz = b.getGenerator('baz');
        var task = baz.tasks.aaa;
        assert(task);
        cb();
      });

      generate.register('bar', function(app, base) {});
      generate.register('baz', function(app, base) {
        app.task('aaa', function() {});
      });
      generate.getGenerator('foo');
    });
  });
});
