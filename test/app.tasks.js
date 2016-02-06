'use strict';

require('mocha');
var assert = require('assert');
var Generate = require('..');
var generate;

describe('.tasks plugin', function() {
  it('should register as a plugin', function() {
    var generate = new Generate();
    assert(generate.registered.hasOwnProperty('base-generators-tasks'));
  });
});

describe('tasks', function() {
  beforeEach(function() {
    generate = new Generate();
  });

  describe('hasTask', function() {
    it('should return true if a task exists', function() {
      generate.task('foo', function() {});
      assert(generate.hasTask('foo'));
    });

    it('should return false if a task does not exist', function() {
      generate.task('foo', function() {});
      assert(!generate.hasTask('bar'));
    });
  });

  describe('.stringifyTasks', function() {
    it('should create a generator-task string', function() {
      assert.equal(generate.stringifyTasks('foo'), 'foo');
      assert.equal(generate.stringifyTasks('foo', function() {}), 'foo');
      assert.equal(generate.stringifyTasks('foo', []), 'foo');
      assert.equal(generate.stringifyTasks('foo:a,b,c'), 'foo:a,b,c');
      assert.equal(generate.stringifyTasks('foo.bar:a,b,c'), 'foo.bar:a,b,c');
      assert.equal(generate.stringifyTasks('foo.bar', 'a,b,c'), 'foo.bar:a,b,c');
      assert.equal(generate.stringifyTasks('foo', 'a,b,c'), 'foo:a,b,c');
      assert.equal(generate.stringifyTasks('foo', ['a', 'b', 'c']), 'foo:a,b,c');
      assert.equal(generate.stringifyTasks(['foo', 'bar'], ['a', 'b']), 'foo.bar:a,b');
      assert.equal(generate.stringifyTasks(['foo', 'bar'], 'a,b,c'), 'foo.bar:a,b,c');
    });
  });
});
