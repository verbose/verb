'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var gm = require('global-modules');
var Verb = require('..');
var verb;

var fixtures = path.resolve.bind(path, __dirname, 'fixtures/generators');

describe('.resolve', function() {
  beforeEach(function() {
    verb = new Verb();
    verb.prefix = 'generate';
  });

  describe('method', function() {
    it('should expose a `resolve` method', function() {
      assert.equal(typeof verb.resolve, 'function');
    });
  });

  describe('local', function() {
    it('should resolve a local generator path', function() {
      var fp = verb.resolve(fixtures('a'));
      assert.equal(typeof fp, 'string');
    });

    it('should resolve a generator path from a cwd', function() {
      assert(verb.resolve('a', {cwd: fixtures()}));
    });

    it('should resolve a generator path from a generator name', function() {
      assert(verb.resolve('a', {cwd: fixtures()}));
    });

    it('should resolve the path to a local config file', function() {
      var fp = verb.resolve('a', {cwd: fixtures()});
      assert.equal(typeof fp, 'string');
    });
  });

  describe('global', function() {
    it('should resolve a global generator path', function() {
      var fp = verb.resolve('bar', gm);
      assert.equal(fp, path.resolve(gm, 'generate-bar/index.js'));
    });

    it('should resolve a global generator path without a cwd', function() {
      var fp = verb.resolve('bar');
      assert.equal(fp, path.resolve(gm, 'generate-bar/index.js'));
    });

    it('should resolve a global generator by full name', function() {
      var fp = verb.resolve('generate-bar');
      assert.equal(fp, path.resolve(gm, 'generate-bar/index.js'));
    });

    it('should return undefined when a generator is not found', function() {
      var fp = verb.resolve('foo-bar');
      assert.equal(typeof fp, 'undefined');
    });

    it('should throw an error when a generator is not found at the given cwd', function(cb) {
      try {
        verb.resolve('foofof', {cwd: fixtures()});
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.code, 'ENOENT');
        cb();
      }
    });
  });
});
