'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Verb = require('..');
var app;

var fixtures = path.resolve.bind(path, __dirname + '/fixtures');

describe('generators.env', function() {
  describe('createEnv paths', function() {
    beforeEach(function() {
      app = new Verb();
    });

    describe('alias and function', function() {
      it('should make the alias the exact name when the second arg is a function', function() {
        var fn = function() {};
        app.createEnv('foo-bar-baz', fn);
        assert(app.env);
        assert(app.env.alias);
        assert.equal(app.env.alias, 'foo-bar-baz');
      });

      it('should not change the name when the second arg is a function', function() {
        var fn = function() {};
        app.createEnv('foo-bar-baz', fn);
        assert(app.env);
        assert(app.env.name);
        assert.equal(app.env.name, 'foo-bar-baz');
      });
    });

    describe('alias and path', function() {
      it('should set a generator by name', function() {
        app.createEnv('fofofof', 'generate-foo/verbfile.js');
        assert.equal(app.env.name, 'fofofof');
      });

      it('should not change the name when the second arg is a function', function() {
        var fn = function() {};
        app.createEnv('foo-bar-baz', fn);
        assert(app.env);
        assert(app.env.name);
        assert.equal(app.env.name, 'foo-bar-baz');
      });
    });
  });

  describe('createEnv', function() {
    beforeEach(function() {
      app = new Verb();
    });

    it('should add an env object to the instance', function() {
      var fn = function() {};
      app.createEnv('foo', fn);
      assert(app.env);
    });

    it('should take options as the second arg', function() {
      var fn = function() {};
      app.createEnv('foo', {}, fn);
      assert(app.env);
    });

    it('should prime `env` if it doesn\'t exist', function() {
      var fn = function() {};
      delete app.env;
      app.createEnv('foo', {}, fn);
      assert(app.env);
    });

    it('should add an alias to the env object', function() {
      var fn = function() {};
      app.createEnv('foo', {}, fn);
      assert.equal(app.env.alias, 'foo');
    });

    it('should not prefix the alias when a function is passed', function() {
      var fn = function() {};
      delete app.prefix;
      app.createEnv('foo', {}, fn);
      assert.equal(app.env.name, 'foo');
    });

    it('should not prefix a custom alias when a function is passed', function() {
      var fn = function() {};
      app.prefix = 'whatever';
      app.createEnv('foo', {}, fn);
      assert.equal(app.env.name, 'foo');
    });

    it('should try to resolve a path passed as the second arg', function() {
      app.createEnv('verb-foo-generator', fixtures('verbfile.js'));
      assert.equal(app.env.alias, 'foo');
      assert.equal(app.env.name, 'verb-foo-generator');
    });

    it('should throw an error when the path is not resolved', function(cb) {
      try {
        var env = app.createEnv('foo', fixtures('whatever.js'));
        env.fn();
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'Cannot find module \'' + fixtures('whatever.js') + '\'');
        cb();
      }
    });
  });
});
