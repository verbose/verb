'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Base = require('..');
var base;
var env;

var fixtures = path.resolve.bind(path, __dirname + '/fixtures');

describe('env', function() {
  describe('plugin', function() {
    it('should work as a plugin', function() {
      base = new Base();
      assert.equal(typeof base.createEnv, 'function');
    });
  });

  describe('createEnv paths', function() {
    beforeEach(function() {
      base = new Base();
    });

    describe('alias and function', function() {
      it('should make the alias the exact name when the second arg is a function', function() {
        var fn = function() {};
        var env = base.createEnv('foo-bar-baz', fn);
        assert(env);
        assert(env.alias);
        assert.equal(env.alias, 'foo-bar-baz');
      });

      it('should not change the name when the second arg is a function', function() {
        var fn = function() {};
        var env = base.createEnv('foo-bar-baz', fn);
        assert(env);
        assert(env.name);
        assert.equal(env.name, 'foo-bar-baz');
      });
    });

    describe('alias and path', function() {
      it('should set the env.name using the given name', function() {
        var env = base.createEnv('foo', 'generate-foo/generator.js');
        assert.equal(env.name, 'foo');
      });

      it('should not change the name when the second arg is a function', function() {
        var fn = function() {};
        var env = base.createEnv('foo-bar-baz', fn);
        assert(env);
        assert(env.name);
        assert.equal(env.name, 'foo-bar-baz');
      });
    });
  });

  describe('createEnv', function() {
    beforeEach(function() {
      base = new Base();
    });

    it('should add an env object to the instance', function() {
      var fn = function() {};
      env = base.createEnv('foo', fn);
      assert(env);
    });

    it('should take options as the second arg', function() {
      var fn = function() {};
      env = base.createEnv('foo', {}, fn);
      assert(env);
    });

    it('should prime `env` if it doesn\'t exist', function() {
      var fn = function() {};
      env = base.createEnv('foo', {}, fn);
      assert(env);
    });

    it('should add an alias to the env object', function() {
      var fn = function() {};
      env = base.createEnv('foo', {}, fn);
      assert.equal(env.alias, 'foo');
    });

    it('should not prefix the alias when a function is passed', function() {
      var fn = function() {};
      delete base.prefix;
      env = base.createEnv('foo', {}, fn);
      assert.equal(env.name, 'foo');
    });

    it('should not prefix a custom alias when a function is passed', function() {
      var fn = function() {};
      base.prefix = 'whatever';
      env = base.createEnv('foo', {}, fn);
      assert.equal(env.name, 'foo');
    });

    it('should try to resolve an absolute path passed as the second arg', function() {
      env = base.createEnv('foo', fixtures('generator.js'));
      assert.equal(env.alias, 'foo');
      assert.equal(env.name, 'foo');
    });

    it('should try to resolve a relative path passed as the second arg', function() {
      env = base.createEnv('foo', 'generate-foo/generator.js');
      assert.equal(env.key, 'foo');
      assert.equal(env.alias, 'foo');
      assert.equal(env.name, 'foo');
    });

    it('should throw an error when the path is not resolved', function(cb) {
      try {
        var env = base.createEnv('foo', fixtures('whatever.js'));
        env.invoke();
        env.path;
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'cannot resolve: \'' + fixtures('whatever.js') + '\'');
        cb();
      }
    });
  });
});
