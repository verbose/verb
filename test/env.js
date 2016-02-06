'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Verb = require('..');
var verb;

var fixtures = path.resolve.bind(path, __dirname + '/fixtures');

describe('env', function() {
  describe('createEnv', function() {
    beforeEach(function() {
      verb = new Verb();
      verb.initVerb({});
    });

    it('should add an env object to the instance', function() {
      var fn = function() {};
      verb.createEnv('foo', fn);
      assert(verb.env);
    });

    it('should take options as the second arg', function() {
      var fn = function() {};
      verb.createEnv('foo', {}, fn);
      assert(verb.env);
    });

    it('should prime `env` if it doesn\'t exist', function() {
      var fn = function() {};
      delete verb.env;
      verb.createEnv('foo', {}, fn);
      assert(verb.env);
    });

    it('should add an alias to the env object', function() {
      var fn = function() {};
      verb.createEnv('foo', {}, fn);
      assert.equal(verb.env.alias, 'foo');
    });

    it('should use the given prefix', function() {
      var fn = function() {};
      verb.prefix = 'generate';
      verb.createEnv('foo', {}, fn);
      assert.equal(verb.env.name, 'generate-foo');
    });

    it('should use `prefix` to add a full name to the env object', function() {
      var fn = function() {};
      verb.prefix = 'whatever';
      verb.createEnv('foo', {}, fn);
      assert.equal(verb.env.name, 'whatever-foo');
    });

    it('should try to resolve a path passed as the second arg', function() {
      verb.createEnv('foo', 'generate-foo/verbfile.js');
      assert.equal(verb.env.alias, 'foo');
      assert.equal(verb.env.name, 'verb-generate-foo');
    });

    it('should throw an error when the path is not resolved', function(cb) {
      try {
        verb.createEnv('foo', fixtures('whatever.js'));
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'cannot find generator: ' + fixtures('whatever.js'));
        cb();
      }
    });
  });
});
