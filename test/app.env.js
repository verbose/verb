'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Generate = require('..');
var generate;

var fixtures = path.resolve.bind(path, __dirname + '/fixtures');

describe('app.env', function() {
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

    it('should not use `prefix` when function is passed', function() {
      var fn = function() {};
      delete generate.prefix;
      generate.createEnv('foo', {}, fn);
      assert.equal(generate.env.name, 'foo');
    });

    it('should use not use custom `prefix` when function is passed', function() {
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
  });
});
