'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Base = require('..');
var base;

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');

describe('.generator', function() {
  beforeEach(function() {
    base = new Base();

    base.option('toAlias', function(key) {
      return key.replace(/^generate-(.*)/, '$1');
    });
  });

  describe('generator', function() {
    it('should get a generator by alias', function() {
      base.register('generate-foo', require('generate-foo'));
      var gen = base.getGenerator('foo');
      assert(gen);
      assert.equal(gen.env.name, 'generate-foo');
      assert.equal(gen.env.alias, 'foo');
    });

    it('should get a generator using a custom lookup function', function() {
      base.register('generate-foo', function() {});
      base.register('generate-bar', function() {});

      var gen = base.getGenerator('foo', {
        lookup: function(key) {
          return ['generate-' + key, 'verb-' + key + '-generator', key];
        }
      });

      assert(gen);
      assert.equal(gen.env.name, 'generate-foo');
      assert.equal(gen.env.alias, 'foo');
    });
  });

  describe('register > function', function() {
    it('should register a generator function by name', function() {
      base.generator('foo', function() {});
      assert(base.generators.hasOwnProperty('foo'));
    });

    it('should register a generator function by alias', function() {
      base.generator('generate-abc', function() {});
      assert(base.generators.hasOwnProperty('generate-abc'));
    });
  });

  describe('get > alias', function() {
    it('should get a generator by alias', function() {
      base.generator('generate-abc', function() {});
      var abc = base.generator('abc');
      assert(abc);
      assert.equal(typeof abc, 'object');
    });
  });

  describe('get > name', function() {
    it('should get a generator by name', function() {
      base.generator('generate-abc', function() {});
      var abc = base.generator('generate-abc');
      assert(abc);
      assert.equal(typeof abc, 'object');
    });
  });

  describe('generators', function() {
    it('should invoke a registered generator when `getGenerator` is called', function(cb) {
      base.register('foo', function(app) {
        app.task('default', function() {});
        cb();
      });
      base.getGenerator('foo');
    });

    it('should expose the generator instance on `app`', function(cb) {
      base.register('foo', function(app) {
        app.task('default', function(next) {
          assert.equal(app.get('a'), 'b');
          next();
        });
      });

      var foo = base.getGenerator('foo');
      foo.set('a', 'b');
      foo.build('default', function(err) {
        if (err) return cb(err);
        cb();
      });
    });

    it('should expose the "base" instance on `base`', function(cb) {
      base.set('x', 'z');
      base.register('foo', function(app, base) {
        app.task('default', function(next) {
          assert.equal(base.get('x'), 'z');
          next();
        });
      });

      var foo = base.getGenerator('foo');
      foo.set('a', 'b');
      foo.build('default', function(err) {
        if (err) return cb(err);
        cb();
      });
    });

    it('should expose the "env" object on `env`', function(cb) {
      base.register('foo', function(app, base, env) {
        app.task('default', function(next) {
          assert.equal(env.alias, 'foo');
          next();
        });
      });

      base.getGenerator('foo').build('default', function(err) {
        if (err) return cb(err);
        cb();
      });
    });

    it('should expose an app\'s generators on app.generators', function(cb) {
      base.register('foo', function(app) {
        app.register('a', function() {});
        app.register('b', function() {});

        app.generators.hasOwnProperty('a');
        app.generators.hasOwnProperty('b');
        cb();
      });

      base.getGenerator('foo');
    });

    it('should expose all root generators on base.generators', function(cb) {
      base.register('foo', function(app, b) {
        b.generators.hasOwnProperty('foo');
        b.generators.hasOwnProperty('bar');
        b.generators.hasOwnProperty('baz');
        cb();
      });

      base.register('bar', function(app, base) {});
      base.register('baz', function(app, base) {});
      base.getGenerator('foo');
    });
  });

  describe('cross-generators', function() {
    it('should get a generator from another generator', function(cb) {
      base.register('foo', function(app, b) {
        var bar = b.getGenerator('bar');
        assert(bar);
        cb();
      });

      base.register('bar', function(app, base) {});
      base.register('baz', function(app, base) {});
      base.getGenerator('foo');
    });

    it('should set options on another generator instance', function(cb) {
      base.generator('foo', function(app) {
        app.task('default', function(next) {
          assert.equal(app.option('abc'), 'xyz');
          next();
        });
      });

      base.generator('bar', function(app, b) {
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
      var one = base.generator('one', fixtures('one/generator.js'));
      assert(base.generators.hasOwnProperty('one'));
      assert.equal(typeof base.generators.one, 'object');
      assert.deepEqual(base.generators.one, one);
    });

    it('should get a registered generator by name', function() {
      var one = base.generator('one', fixtures('one/generator.js'));
      var two = base.generator('two', fixtures('two/generator.js'));
      assert(base.generator('one'));
      assert(base.generator('two'));
    });
  });

  describe('tasks', function() {
    it('should expose a generator\'s tasks on app.tasks', function(cb) {
      base.register('foo', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        assert(app.tasks.a);
        assert(app.tasks.b);
        cb();
      });

      base.getGenerator('foo');
    });

    it('should get tasks from another generator', function(cb) {
      base.register('foo', function(app, b) {
        var baz = b.getGenerator('baz');
        var task = baz.tasks.aaa;
        assert(task);
        cb();
      });

      base.register('bar', function(app, base) {});
      base.register('baz', function(app, base) {
        app.task('aaa', function() {});
      });
      base.getGenerator('foo');
    });
  });

  describe('namespace', function() {
    it('should expose `app.namespace`', function(cb) {
      base.generator('foo', function(app) {
        assert(typeof app.namespace, 'string');
        cb();
      });
    });

    it('should create namespace from generator alias', function(cb) {
      base.generator('generate-foo', function(app) {
        assert.equal(app.namespace, base._name + '.foo');
        cb();
      });
    });

    it('should create sub-generator namespace from parent namespace and alias', function(cb) {
      var name = base._name;
      base.generator('generate-foo', function(app) {
        assert.equal(app.namespace, name + '.foo');

        app.generator('generate-bar', function(bar) {
          assert.equal(bar.namespace, name + '.foo.bar');

          bar.generator('generate-baz', function(baz) {
            assert.equal(baz.namespace, name + '.foo.bar.baz');

            baz.generator('generate-qux', function(qux) {
              assert.equal(qux.namespace, name + '.foo.bar.baz.qux');
              cb();
            });
          });
        });
      });
    });

    it('should expose namespace on `this`', function(cb) {
      base.generator('generate-foo', function(app, first) {
        assert.equal(this.namespace, base._name + '.foo');

        this.generator('generate-bar', function() {
          assert.equal(this.namespace, base._name + '.foo.bar');

          this.generator('generate-baz', function() {
            assert.equal(this.namespace, base._name + '.foo.bar.baz');

            this.generator('generate-qux', function() {
              assert.equal(this.namespace, base._name + '.foo.bar.baz.qux');
              assert.equal(app.namespace, base._name + '.foo');
              assert.equal(first.namespace, base._name);
              cb();
            });
          });
        });
      });
    });
  });
});
