'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var argv = require('yargs-parser')(process.argv.slice(2));
var runner = require('base-runner');
var Generate = require('..');
var base;

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var config = {
  name: 'foo',
  runner: require(fixtures('package.json')),
  configName: 'generator',
  extensions: {
    '.js': null
  }
};

describe('.runner', function() {
  var error = console.error;

  beforeEach(function() {
    console.error = function() {};
  });

  afterEach(function() {
    console.error = error;
  });

  describe('errors', function() {
    it('should throw an error when a callback is not passed', function(cb) {
      try {
        runner();
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'expected a callback function');
        cb();
      }
    });

    it('should error when an options object is not passed', function(cb) {
      runner(Generate, {}, null, function(err, app, runnerContext) {
        assert(err);
        assert.equal(err.message, 'expected the third argument to be an options object');
        cb();
      });
    });

    it('should error when a liftoff config object is not passed', function(cb) {
      runner(Generate, null, {}, function(err, app, runnerContext) {
        assert(err);
        assert.equal(err.message, 'expected the second argument to be a liftoff config object');
        cb();
      });
    });

    it('should error when a Generate constructor is not passed', function(cb) {
      runner(null, {}, {}, function(err, app, runnerContext) {
        assert(err);
        assert.equal(err.message, 'expected the first argument to be a Base constructor');
        cb();
      });
    });
  });

  describe('runner', function() {
    it('should set "env" on app.cache.runnerContext', function(cb) {
      runner(Generate, config, argv, function(err, app, runnerContext) {
        if (err) return cb(err);
        assert(app.cache.runnerContext.env);
        assert.equal(typeof app.cache.runnerContext.env, 'object');
        cb();
      });
    });

    it('should set "config" on app.cache.runnerContext', function(cb) {
      runner(Generate, config, argv, function(err, app, runnerContext) {
        if (err) return cb(err);
        assert(app.cache.runnerContext.config);
        assert.equal(typeof app.cache.runnerContext.config, 'object');
        cb();
      });
    });

    it('should set the configFile on app.cache.runnerContext.env', function(cb) {
      runner(Generate, config, argv, function(err, app, runnerContext) {
        if (err) return cb(err);
        assert.equal(app.cache.runnerContext.env.configFile, 'generator.js');
        cb();
      });
    });

    it('should set cwd on the instance', function(cb) {
      runner(Generate, config, {cwd: fixtures()}, function(err, app, runnerContext) {
        if (err) return cb(err);
        assert.equal(app.cwd, fixtures());
        cb();
      });
    });

    it('should resolve configpath from app.cwd and app.configFile', function(cb) {
      runner(Generate, config, {cwd: fixtures()}, function(err, app, runnerContext) {
        if (err) return cb(err);
        assert.equal(app.cache.runnerContext.env.configPath, path.resolve(__dirname, 'fixtures/generator.js'));
        cb();
      });
    });
  });
});
