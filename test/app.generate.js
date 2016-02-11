'use strict';

require('mocha');
var assert = require('assert');
var Verb = require('..');
var verb;

describe('.generate', function() {
  beforeEach(function() {
    verb = new Verb();
  });

  describe('generators', function(cb) {
    it('should throw an error when a generator is not found', function(cb) {
      verb.generate('fdsslsllsfjssl', function(err) {
        assert(err);
        assert.equal('Cannot find generator: "fdsslsllsfjssl"', err.message);
        cb();
      });
    });

    // special case
    it('should throw an error when a generator is not found in argv.cwd', function(cb) {
      verb.option('cwd', 'foo/bar/baz');
      verb.generate('sflsjljskksl', function(err) {
        assert(err);
        assert.equal('Cannot find generator: "sflsjljskksl" in "foo/bar/baz/verbfile.js"', err.message);
        cb();
      });
    });

    it('should throw an error when a stringified task is not found', function(cb) {
      verb.register('fdsslsllsfjssl', function() {});
      verb.generate('fdsslsllsfjssl:foo', function(err) {
        assert(err);
        assert.equal('Cannot find task: "foo" in generator: "fdsslsllsfjssl"', err.message);
        cb();
      });
    });

    it('should throw an error when a task is not found', function(cb) {
      verb.register('fdsslsllsfjssl', function() {});
      verb.generate('fdsslsllsfjssl', ['foo'], function(err) {
        assert(err);
        assert.equal('Cannot find task: "foo" in generator: "fdsslsllsfjssl"', err.message);
        cb();
      });
    });

    it('should not reformat error messages that are not about invalid tasks', function(cb) {
      verb.task('default', function(cb) {
        cb(new Error('whatever'));
      });

      verb.generate('default', function(err) {
        assert(err);
        assert.equal(err.message, 'whatever');
        cb();
      });
    });

    it('should run a task on the instance', function(cb) {
      verb.task('foo', function(next) {
        next();
      });

      verb.generate('foo', function(err) {
        assert(!err);
        cb();
      });
    });

    it('should run a task instead of a generator of the same name', function(cb) {
      verb.register('foo', function(app) {
        app.task('default', function() {
          cb(new Error('expected the task to run first'));
        });
      });

      verb.task('foo', function() {
        cb();
      });

      verb.generate('foo', function(err) {
        assert(!err);
      });
    });

    it('should run a task on a generator with the same name when specified', function(cb) {
      verb.register('foo', function(app) {
        app.task('default', function() {
          cb();
        });
      });

      verb.task('foo', function() {
        cb(new Error('expected the generator to run'));
      });

      verb.generate('foo:default', function(err) {
        assert(!err);
      });
    });

    it('should run the default task on a generator', function(cb) {
      verb.register('foo', function(app) {
        app.task('default', function(next) {
          next();
        });
      });

      verb.generate('foo', function(err) {
        assert(!err);
        cb();
      });
    });

    it('should run an array of tasks on the instance', function(cb) {
      var count = 0;
      verb.task('a', function(next) {
        count++;
        next();
      });
      verb.task('b', function(next) {
        count++;
        next();
      });
      verb.task('c', function(next) {
        count++;
        next();
      });

      verb.generate('a,b,c', function(err) {
        assert.equal(count, 3);
        assert(!err);
        cb();
      });
    });

    it('should run the default task on the default generator', function(cb) {
      var count = 0;
      verb.register('default', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      verb.generate(function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run the default task on a registered generator', function(cb) {
      var count = 0;
      verb.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });
      });

      verb.generate('foo', function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run the specified task on a registered generator', function(cb) {
      var count = 0;
      verb.register('foo', function(app) {
        app.task('default', function(next) {
          count++;
          next();
        });

        app.task('abc', function(next) {
          count++;
          next();
        });
      });

      verb.generate('foo', ['abc'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run an array of tasks on a registered generator', function(cb) {
      var count = 0;
      verb.register('foo', function(app) {
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

      verb.generate('foo', 'a,b,c', function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });

  describe('sub-generators', function(cb) {
    it('should run the default task on a registered sub-generator', function(cb) {
      var count = 0;
      verb.register('foo', function(app) {
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

      verb.generate('foo.sub', function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run the specified task on a registered sub-generator', function(cb) {
      var count = 0;
      verb.register('foo', function(app) {
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

      verb.generate('foo.sub', ['abc'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should run an array of tasks on a registered sub-generator', function(cb) {
      var count = 0;
      verb.register('foo', function(app) {
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

      verb.generate('foo.bar', ['a', 'b', 'c'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });

    it('should run an multiple tasks on a registered sub-generator', function(cb) {
      var count = 0;
      verb.register('foo', function(app) {
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

      verb.generate('foo.bar', 'a,b,c', function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });
  });

  describe('cross-generator', function(cb) {
    it('should run a generator from another generator', function(cb) {
      var res = '';

      verb.register('foo', function(app, two) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            res += 'foo > sub > default ';
            verb.generate('bar.sub', next);
          });
        });
      });

      verb.register('bar', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            res += 'bar > sub > default ';
            next();
          });
        });
      });

      verb.generate('foo.sub', function(err) {
        if (err) return cb(err);
        assert.equal(res, 'foo > sub > default bar > sub > default ');
        cb();
      });
    });

    it('should run the specified task on a registered sub-generator', function(cb) {
      var count = 0;
      verb.register('foo', function(app) {
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

      verb.generate('foo.sub', ['abc'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });
  });

  describe('events', function(cb) {
    it('should emit generate', function(cb) {
      verb.on('generate', function() {
        cb();
      });

      verb.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            next();
          });

          sub.task('abc', function(next) {
            next();
          });
        });
      });

      verb.generate('foo.sub', ['abc'], function(err) {
        if (err) return cb(err);
      });
    });

    it('should expose the generator alias as the first parameter', function(cb) {
      verb.on('generate', function(name) {
        assert.equal(name, 'sub');
        cb();
      });

      verb.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            next();
          });

          sub.task('abc', function(next) {
            next();
          });
        });
      });

      verb.generate('foo.sub', ['abc'], function(err) {
        if (err) return cb(err);
      });
    });

    it('should expose the tasks array as the second parameter', function(cb) {
      verb.on('generate', function(name, tasks) {
        assert.deepEqual(tasks, ['abc']);
        cb();
      });

      verb.register('foo', function(app) {
        app.register('sub', function(sub) {
          sub.task('default', function(next) {
            next();
          });

          sub.task('abc', function(next) {
            next();
          });
        });
      });

      verb.generate('foo.sub', ['abc'], function(err) {
        if (err) return cb(err);
      });
    });
  });
});
