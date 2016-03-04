'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Generate = require('..');
var generate;

var fixtures = path.resolve.bind(path, __dirname + '/fixtures');

describe('env', function() {
  describe('createEnv paths', function() {
    beforeEach(function() {
      generate = new Generate();
    });

    describe('alias and function', function() {
      it('should make the alias the exact name when the second arg is a function', function() {
        var fn = function() {};
        generate.createEnv('foo-bar-baz', fn);
        assert(generate.env);
        assert(generate.env.alias);
        assert.equal(generate.env.alias, 'foo-bar-baz');
      });

      it('should not change the name when the second arg is a function', function() {
        var fn = function() {};
        generate.createEnv('foo-bar-baz', fn);
        assert(generate.env);
        assert(generate.env.name);
        assert.equal(generate.env.name, 'foo-bar-baz');
      });
    });

    describe('alias and path', function() {
      it('should set the name to the basename of a generator\'s dirname', function() {
        generate.createEnv('foo', 'generate-foo/verbfile.js');
        assert.equal(generate.env.name, 'generate-foo');
      });

      it('should not change the name when the second arg is a function', function() {
        var fn = function() {};
        generate.createEnv('foo-bar-baz', fn);
        assert(generate.env);
        assert(generate.env.name);
        assert.equal(generate.env.name, 'foo-bar-baz');
      });
    });
  });

  describe('createEnv', function() {
    beforeEach(function() {
      generate = new Generate();
    });

    it('should add an env object to the instance', function() {
      var fn = function() {};
      generate.createEnv('foo', fn);
      assert(generate.env);
    });

    it('should take options as the second arg', function() {
      var fn = function() {};
      generate.createEnv('foo', {}, fn);
      assert(generate.env);
    });

    it('should prime `env` if it doesn\'t exist', function() {
      var fn = function() {};
      delete generate.env;
      generate.createEnv('foo', {}, fn);
      assert(generate.env);
    });

    it('should add an alias to the env object', function() {
      var fn = function() {};
      generate.createEnv('foo', {}, fn);
      assert.equal(generate.env.alias, 'foo');
    });

    it('should not prefix the alias when a function is passed', function() {
      var fn = function() {};
      delete generate.prefix;
      generate.createEnv('foo', {}, fn);
      assert.equal(generate.env.name, 'foo');
    });

    it('should not prefix a custom alias when a function is passed', function() {
      var fn = function() {};
      generate.prefix = 'whatever';
      generate.createEnv('foo', {}, fn);
      assert.equal(generate.env.name, 'foo');
    });

    it('should try to resolve a path passed as the second arg', function() {
      generate.createEnv('generate-foo', fixtures('verbfile.js'));
      assert.equal(generate.env.alias, 'foo');
      assert.equal(generate.env.name, 'generate-foo');
    });

    it('should try to resolve a path passed as the second arg', function() {
      generate.createEnv('generate-foo', 'generate-foo/verbfile.js');
      assert.equal(generate.env.alias, 'foo');
      assert.equal(generate.env.name, 'generate-foo');
    });

    it('should throw an error when the path is not resolved', function(cb) {
      try {
        generate.createEnv('foo', fixtures('whatever.js'));
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'cannot find generator: ' + fixtures('whatever.js'));
        cb();
      }
    });
  });
});
