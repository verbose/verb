'use strict';

require('mocha');
var assert = require('assert');
var Base = require('..');
var base;

describe('.lookupGenerator', function() {
  beforeEach(function() {
    base = new Base();

    base.option('toAlias', function(key) {
      return key.replace(/^generate-(.*)/, '$1');
    });
  });

  it('should get a generator using a custom lookup function', function() {
    base.register('generate-foo', function() {});
    base.register('generate-bar', function() {});
    var gen = base.lookupGenerator('foo', function(key) {
      return ['generate-' + key, 'verb-' + key + '-generator', key];
    });

    assert(gen);
    assert.equal(gen.env.name, 'generate-foo');
    assert.equal(gen.env.alias, 'foo');
  });

  it('should get a generator using a custom lookup function passed on options', function() {
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

  it('should return undefined when nothing is found', function() {
    var gen = base.lookupGenerator('fofofofofo', function(key) {
      return ['generate-' + key, 'verb-' + key + '-generator', key];
    });

    assert(!gen);
  });

  it('should throw an error when a function is not passed', function(cb) {
    try {
      base.lookupGenerator('foo');
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected `fn` to be a lookup function');
      cb();
    }
  });
});
