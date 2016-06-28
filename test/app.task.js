'use strict';

require('mocha');
var assert = require('assert');
var Base = require('..');
var base;

describe('.generate', function() {
  beforeEach(function() {
    base = new Base();
  });

  it('should register a task', function() {
    var fn = function(cb) {
      cb();
    };
    base.task('default', fn);
    assert.equal(typeof base.tasks.default, 'object');
    assert.equal(base.tasks.default.fn, fn);
  });

  it('should register a task with an array of dependencies', function(cb) {
    var count = 0;
    base.task('foo', function(next) {
      count++;
      next();
    });
    base.task('bar', function(next) {
      count++;
      next();
    });
    base.task('default', ['foo', 'bar'], function(next) {
      count++;
      next();
    });
    assert.equal(typeof base.tasks.default, 'object');
    assert.deepEqual(base.tasks.default.deps, ['foo', 'bar']);
    base.build('default', function(err) {
      if (err) return cb(err);
      assert.equal(count, 3);
      cb();
    });
  });

  it('should run a glob of tasks', function(cb) {
    var count = 0;
    base.task('foo', function(next) {
      count++;
      next();
    });
    base.task('bar', function(next) {
      count++;
      next();
    });
    base.task('baz', function(next) {
      count++;
      next();
    });
    base.task('qux', function(next) {
      count++;
      next();
    });
    base.task('default', ['b*']);
    assert.equal(typeof base.tasks.default, 'object');
    base.build('default', function(err) {
      if (err) return cb(err);
      assert.equal(count, 2);
      cb();
    });
  });

  it('should register a task with a list of strings as dependencies', function() {
    base.task('default', 'foo', 'bar', function(cb) {
      cb();
    });
    assert.equal(typeof base.tasks.default, 'object');
    assert.deepEqual(base.tasks.default.deps, ['foo', 'bar']);
  });

  it('should run a task', function(cb) {
    var count = 0;
    base.task('default', function(cb) {
      count++;
      cb();
    });

    base.build('default', function(err) {
      if (err) return cb(err);
      assert.equal(count, 1);
      cb();
    });
  });

  it('should throw an error when a task with unregistered dependencies is run', function(cb) {
    base.task('default', ['foo', 'bar']);
    base.build('default', function(err) {
      assert(err);
      cb();
    });
  });

  it('should throw an error when `.build` is called without a callback function.', function() {
    try {
      base.build('default');
      throw new Error('Expected an error to be thrown.');
    } catch (err) {
    }
  });

  it('should emit task events', function(cb) {
    var events = [];
    base.on('task:starting', function(task) {
      events.push('starting.' + task.name);
    });
    base.on('task:finished', function(task) {
      events.push('finished.' + task.name);
    });
    base.on('task:error', function(e, task) {
      events.push('error.' + task.name);
    });
    base.task('foo', function(cb) {
      cb();
    });
    base.task('bar', ['foo'], function(cb) {
      cb();
    });
    base.task('default', ['bar']);
    base.build('default', function(err) {
      if (err) return cb(err);
      assert.deepEqual(events, [
        'starting.default',
        'starting.bar',
        'starting.foo',
        'finished.foo',
        'finished.bar',
        'finished.default'
      ]);
      cb();
    });
  });

  it('should emit an error event when an error is passed back in a task', function(cb) {
    base.on('error', function(err) {
      assert(err);
      assert.equal(err.message, 'This is an error');
    });
    base.task('default', function(cb) {
      return cb(new Error('This is an error'));
    });
    base.build('default', function(err) {
      if (err) return cb();
      cb(new Error('Expected an error'));
    });
  });

  it('should emit an error event when an error is thrown in a task', function(cb) {
    base.on('error', function(err) {
      assert(err);
      assert.equal(err.message, 'This is an error');
    });
    base.task('default', function(cb) {
      cb(new Error('This is an error'));
    });
    base.build('default', function(err) {
      assert(err);
      cb();
    });
  });

  it('should run dependencies before running the dependent task.', function(cb) {
    var seq = [];
    base.task('foo', function(cb) {
      seq.push('foo');
      cb();
    });
    base.task('bar', function(cb) {
      seq.push('bar');
      cb();
    });
    base.task('default', ['foo', 'bar'], function(cb) {
      seq.push('default');
      cb();
    });

    base.build('default', function(err) {
      if (err) return cb(err);
      assert.deepEqual(seq, ['foo', 'bar', 'default']);
      cb();
    });
  });
});
