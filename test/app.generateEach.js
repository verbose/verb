'use strict';

require('mocha');
var assert = require('assert');
var config = require('base-config-process');
var Base = require('..');
var base;

describe('.generate', function() {
  beforeEach(function() {
    base = new Base();
  });

  describe('config.process', function(cb) {
    it('should run tasks when the base-config plugin is used', function(cb) {
      base.use(config());
      var count = 0;
      base.task('default', function(next) {
        count++;
        next();
      });

      base.generate('default', function(err) {
        assert(!err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run handle errors when the base-config plugin is used', function(cb) {
      base.use(config());
      var count = 0;
      base.task('default', function(next) {
        count++;
        next(new Error('fooo'));
      });

      base.generate('default', function(err) {
        assert.equal(err.message, 'fooo');
        assert.equal(count, 1);
        cb();
      });
    });

    it('should handle config errors when the base-config plugin is used', function(cb) {
      base.use(config());
      var count = 0;
      base.config.map('foo', function(val, key, config, next) {
        count++;
        next(new Error('fooo'));
      });

      base.set('cache.config', {foo: true});

      base.task('default', function(next) {
        count--;
        next();
      });

      base.generate('default', function(err) {
        assert(err);
        assert.equal(err.message, 'fooo');
        assert.equal(count, 1);
        cb();
      });
    });
  });

  describe('generators', function(cb) {
    it('should throw an error when a generator is not found', function(cb) {
      base.generate('fdsslsllsfjssl', function(err) {
        assert(err);
        assert.equal('Cannot find generator: "fdsslsllsfjssl"', err.message);
        cb();
      });
    });

    it('should *not* throw an error when the default task is not found', function(cb) {
      base.register('foo', function() {});
      base.generate('foo:default', function(err) {
        assert(!err);
        cb();
      });
    });

    it('should not throw an error when a default generator is not found', function(cb) {
      base.generate('default', function(err) {
        assert(!err);
        cb();
      });
    });

    it('should not throw an error when a default task and default generator is not found', function(cb) {
      base.generate('default:default', function(err) {
        assert(!err);
        cb();
      });
    });

    // special case
    it('should throw an error when a generator is not found in argv.cwd', function(cb) {
      base.option('cwd', 'foo/bar/baz');
      base.generate('sflsjljskksl', function(err) {
        assert(err);
        assert.equal('Cannot find generator: "sflsjljskksl" in "foo/bar/baz"', err.message);
        cb();
      });
    });

    it('should not reformat error messages that are not about invalid tasks', function(cb) {
      base.task('default', function(cb) {
        cb(new Error('whatever'));
      });

      base.generate('default', function(err) {
        assert(err);
        assert.equal(err.message, 'whatever');
        cb();
      });
    });

    it('should not throw an error when the default task is not defined', function(cb) {
      base.register('foo', function() {});
      base.register('bar', function() {});
      base.generate('foo', ['default'], function(err) {
        if (err) return cb(err);

        base.generate('bar', function(err) {
          if (err) return cb(err);

          cb();
        });
      });
    });

    it('should run a task on the instance', function(cb) {
      base.task('abc123', function(next) {
        next();
      });

      base.generate('abc123', function(err) {
        assert(!err);
        cb();
      });
    });

    it('should run same-named task instead of a generator', function(cb) {
      base.register('123xyz', function(app) {
        cb(new Error('expected the task to run first'));
      });

      base.task('123xyz', function() {
        cb();
      });

      base.generate('123xyz', function(err) {
        assert(!err);
      });
    });

    it('should run a task instead of a generator with a default task', function(cb) {
      base.register('123xyz', function(app) {
        app.task('default', function() {
          cb(new Error('expected the task to run first'));
        });
      });
      base.task('123xyz', function() {
        cb();
      });
      base.generate('123xyz', function(err) {
        assert(!err);
      });
    });

    it('should run a task on a same-named generator when the task is specified', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      base.task('foo', function() {
        cb(new Error('expected the generator to run'));
      });

      base.generate('foo:default', function(err) {
        assert(!err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run an array of tasks that includes a same-named generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      base.register('bar', function(app) {
        app.task('baz', function(next) {
          count++;
          next();
        });
      });

      base.task('foo', function() {
        cb(new Error('expected the generator to run'));
      });

      base.generate(['foo:default', 'bar:baz'], function(err) {
        assert(!err);
        assert.equal(count, 2);
        cb();
      });
    });

    it('should run a generator from a task with the same name', function(cb) {
      base.register('foo', function(app) {
        app.task('default', function() {
          cb();
        });
      });

      base.task('foo', function(cb) {
        base.generate('foo', cb);
      });

      base.build('foo', function(err) {
        if (err) cb(err);
      });
    });

    it('should run the default task on a generator', function(cb) {
      base.register('foo', function(app) {
        app.task('default', function(next) {
          next();
        });
      });

      base.generate('foo', function(err) {
        assert(!err);
        cb();
      });
    });

    it('should run a stringified array of tasks on the instance', function(cb) {
      var count = 0;
      base.task('a', function(next) {
        count++;
        next();
      });
      base.task('b', function(next) {
        count++;
        next();
      });
      base.task('c', function(next) {
        count++;
        next();
      });

      base.generate('a,b,c', function(err) {
        assert.equal(count, 3);
        assert(!err);
        cb();
      });
    });

    it('should run an array of tasks on the instance', function(cb) {
      var count = 0;
      base.task('a', function(next) {
        count++;
        next();
      });
      base.task('b', function(next) {
        count++;
        next();
      });
      base.task('c', function(next) {
        count++;
        next();
      });

      base.generate(['a', 'b', 'c'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        assert(!err);
        cb();
      });
    });

    it('should run the default task on a registered generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      base.generate('foo', function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run an array of generators', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      base.register('bar', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      base.generate(['foo', 'bar'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 2);
        cb();
      });
    });

    it('should run the default task on the default generator', function(cb) {
      var count = 0;
      base.register('default', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      base.generate(function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run the specified task on a registered generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });

        app.task('abc', function(next) {
          count++;
          next();
        });
      });

      base.generate('foo:abc', function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run an array of tasks on a registered generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });

        app.task('a', function(next) {
          count++;
          next();
        });

        app.task('b', function(next) {
          count++;
          next();
        });

        app.task('c', function(next) {
          count++;
          next();
        });
      });

      base.generate('foo:a,b,c', function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });

    it('should run the default tasks on an array of generators', function(cb) {
      var count = 0;
      base.register('a', function(app) {
        this.task('default', function(cb) {
          count++;
          cb();
        });
      });

      base.register('b', function(app) {
        this.task('default', function(cb) {
          count++;
          cb();
        });
      });

      base.register('c', function(app) {
        this.task('default', function(cb) {
          count++;
          cb();
        });
      });

      base.generate(['a', 'b', 'c'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        assert(!err);
        cb();
      });
    });
  });

  describe('options', function(cb) {
    it('should pass options to generator.options', function(cb) {
      var count = 0;
      base.register('default', function(app, base, env, options) {
        app.task('default', function(next) {
          count++;
          assert.equal(app.options.foo, 'bar');
          next();
        });
      });

      base.generate({foo: 'bar'}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should expose options on generator options', function(cb) {
      var count = 0;
      base.register('default', function(app, base, env, options) {
        app.task('default', function(next) {
          count++;
          assert.equal(options.foo, 'bar');
          next();
        });
      });

      base.generate({foo: 'bar'}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should not mutate options on parent instance', function(cb) {
      var count = 0;
      base.register('default', function(app, base, env, options) {
        app.task('default', function(next) {
          count++;
          assert.equal(options.foo, 'bar');
          assert(!base.options.foo);
          next();
        });
      });

      base.generate({foo: 'bar'}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });
  });

  describe('default tasks', function(cb) {
    it('should run the default task on the default generator', function(cb) {
      var count = 0;
      base.register('default', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      base.generate(function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run the default task on a registered generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      base.generate('foo', function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });
  });

  describe('specified tasks', function(cb) {
    it('should run the specified task on a registered generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });

        app.task('abc', function(next) {
          count++;
          next();
        });
      });

      base.generate('foo', ['abc'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run an array of tasks on a registered generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });

        app.task('a', function(next) {
          count++;
          next();
        });

        app.task('b', function(next) {
          count++;
          next();
        });

        app.task('c', function(next) {
          count++;
          next();
        });
      });

      base.generate('foo', 'a,b,c', function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });

  describe('sub-generators', function(cb) {
    it('should run the default task on a registered sub-generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            count++;
            next();
          });

          sub.task('abc', function(next) {
            count++;
            next();
          });
        });
      });

      base.generate('foo.sub', function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run the specified task string on a registered sub-generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            count++;
            next();
          });

          sub.task('abc', function(next) {
            count++;
            next();
          });
        });
      });

      base.generate('foo.sub:abc', function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run the specified task array on a registered sub-generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            count++;
            next();
          });

          sub.task('abc', function(next) {
            count++;
            next();
          });
        });
      });

      base.generate('foo.sub', ['abc'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run an of stringified-tasks on a registered sub-generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.register('bar', function(bar) {
          bar.task('default', function(next) {
            count++;
            next();
          });

          bar.task('a', function(next) {
            count++;
            next();
          });

          bar.task('b', function(next) {
            count++;
            next();
          });

          bar.task('c', function(next) {
            count++;
            next();
          });
        });
      });

      base.generate('foo.bar:a,b,c', function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });

    it('should run an array of tasks on a registered sub-generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.register('bar', function(bar) {
          bar.task('default', function(next) {
            count++;
            next();
          });

          bar.task('a', function(next) {
            count++;
            next();
          });

          bar.task('b', function(next) {
            count++;
            next();
          });

          bar.task('c', function(next) {
            count++;
            next();
          });
        });
      });

      base.generate('foo.bar', ['a', 'b', 'c'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });

    it('should run an multiple tasks on a registered sub-generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.register('bar', function(bar) {
          bar.task('default', function(next) {
            count++;
            next();
          });

          bar.task('a', function(next) {
            count++;
            next();
          });

          bar.task('b', function(next) {
            count++;
            next();
          });

          bar.task('c', function(next) {
            count++;
            next();
          });
        });
      });

      base.generate('foo.bar', 'a,b,c', function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });

    it('should run an multiple tasks on a registered sub-generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.register('bar', function(bar) {
          bar.task('default', function(next) {
            count++;
            next();
          });

          bar.task('a', function(next) {
            count++;
            next();
          });

          bar.task('b', function(next) {
            count++;
            next();
          });

          bar.task('c', function(next) {
            count++;
            next();
          });
        });
      });

      base.register('qux', function(app) {
        app.register('fez', function(fez) {
          fez.task('default', function(next) {
            count++;
            next();
          });

          fez.task('a', function(next) {
            count++;
            next();
          });

          fez.task('b', function(next) {
            count++;
            next();
          });

          fez.task('c', function(next) {
            count++;
            next();
          });
        });
      });

      base.generate(['foo.bar:a,b,c', 'qux.fez:a,b,c'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 6);
        cb();
      });
    });
  });

  describe('cross-generator', function(cb) {
    it('should run a generator from another generator', function(cb) {
      var res = '';

      base.register('foo', function(app, two) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            res += 'foo > sub > default ';
            base.generate('bar.sub', next);
          });
        });
      });

      base.register('bar', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            res += 'bar > sub > default ';
            next();
          });
        });
      });

      base.generate('foo.sub', function(err) {
        if (err) return cb(err);
        assert.equal(res, 'foo > sub > default bar > sub > default ');
        cb();
      });
    });

    it('should run the specified task on a registered sub-generator', function(cb) {
      var count = 0;
      base.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            count++;
            next();
          });

          sub.task('abc', function(next) {
            count++;
            next();
          });
        });
      });

      base.generate('foo.sub:abc', function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });
  });

  describe('events', function(cb) {
    it('should emit generate', function(cb) {
      var count = 0;

      base.on('generate', function() {
        count++;
      });

      base.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            next();
          });

          sub.task('abc', function(next) {
            count++;
            next();
          });
        });
      });

      base.generate('foo.sub', ['abc'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 2);
        cb();
      });
    });

    it('should expose the generator alias as the first parameter', function(cb) {
      base.on('generate', function(name) {
        assert.equal(name, 'sub');
        cb();
      });

      base.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            next();
          });

          sub.task('abc', function(next) {
            next();
          });
        });
      });

      base.generate('foo.sub:abc', function(err) {
        if (err) return cb(err);
      });
    });

    it('should expose the tasks array as the second parameter', function(cb) {
      base.on('generate', function(name, tasks) {
        assert.deepEqual(tasks, ['abc']);
        cb();
      });

      base.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            next();
          });

          sub.task('abc', function(next) {
            next();
          });
        });
      });

      base.generate('foo.sub:abc', function(err) {
        if (err) return cb(err);
      });
    });
  });
});
