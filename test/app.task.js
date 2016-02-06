'use strict';

require('mocha');
var assert = require('assert');
var Generate = require('..');
var generate;

describe('.generate', function() {
  beforeEach(function() {
    generate = new Generate();
  });

  it('should register a task', function() {
    var fn = function(cb) {
      cb();
    };
    generate.task('default', fn);
    assert.equal(typeof generate.tasks.default, 'object');
    assert.equal(generate.tasks.default.fn, fn);
  });

  it('should register a task with an array of dependencies', function() {
    generate.task('default', ['foo', 'bar'], function(cb) {
      cb();
    });
    assert.equal(typeof generate.tasks.default, 'object');
    assert.deepEqual(generate.tasks.default.deps, ['foo', 'bar']);
  });

  it('should register a task with a list of strings as dependencies', function() {
    generate.task('default', 'foo', 'bar', function(cb) {
      cb();
    });
    assert.equal(typeof generate.tasks.default, 'object');
    assert.deepEqual(generate.tasks.default.deps, ['foo', 'bar']);
  });

  it('should run a task', function(cb) {
    var count = 0;
    generate.task('default', function(cb) {
      count++;
      cb();
    });

    generate.build('default', function(err) {
      if (err) return cb(err);
      assert.equal(count, 1);
      cb();
    });
  });

  it('should throw an error when a task with unregistered dependencies is run', function(cb) {
    generate.task('default', ['foo', 'bar']);
    generate.build('default', function(err) {
      assert(err);
      cb();
    });
  });

  it('should throw an error when `.build` is called without a callback function.', function() {
    try {
      generate.build('default');
      throw new Error('Expected an error to be thrown.');
    } catch (err) {
    }
  });

  it('should emit task events', function(cb) {
    var events = [];
    generate.on('task:starting', function(task) {
      events.push('starting.' + task.name);
    });
    generate.on('task:finished', function(task) {
      events.push('finished.' + task.name);
    });
    generate.on('task:error', function(e, task) {
      events.push('error.' + task.name);
    });
    generate.task('foo', function(cb) {
      cb();
    });
    generate.task('bar', ['foo'], function(cb) {
      cb();
    });
    generate.task('default', ['bar']);
    generate.build('default', function(err) {
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
    generate.on('error', function(err) {
      assert(err);
      assert.equal(err.message, 'This is an error');
    });
    generate.task('default', function(cb) {
      return cb(new Error('This is an error'));
    });
    generate.build('default', function(err) {
      if (err) return cb();
      cb(new Error('Expected an error'));
    });
  });

  it('should emit an error event when an error is thrown in a task', function(cb) {
    generate.on('error', function(err) {
      assert(err);
      assert.equal(err.message, 'This is an error');
    });
    generate.task('default', function(cb) {
      cb(new Error('This is an error'));
    });
    generate.build('default', function(err) {
      assert(err);
      cb();
    });
  });

  it('should run dependencies before running the dependent task.', function(cb) {
    var seq = [];
    generate.task('foo', function(cb) {
      seq.push('foo');
      cb();
    });
    generate.task('bar', function(cb) {
      seq.push('bar');
      cb();
    });
    generate.task('default', ['foo', 'bar'], function(cb) {
      seq.push('default');
      cb();
    });

    generate.build('default', function(err) {
      if (err) return cb(err);
      assert.deepEqual(seq, ['foo', 'bar', 'default']);
      cb();
    });
  });
});
