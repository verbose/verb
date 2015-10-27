'use strict';

require('mocha');
var assert = require('assert');
var minimist = require('minimist');
var expandArgs = require('expand-args');
var config = require('base-config');
var verb = require('..');
var app;

function expand(argv) {
  return expandArgs(minimist(argv));
}

describe('config', function () {
  beforeEach(function() {
    app = verb();
    app.use(config());
  });

  describe('methods', function () {
    it('should expose a "config" function on app:', function () {
      assert(app.config);
      assert(typeof app.config === 'function');
    });

    it('should expose a "process" method on app.config:', function () {
      assert(typeof app.config.process === 'function');
    });

    it('should expose a "map" method on app.config:', function () {
      assert(typeof app.config.map === 'function');
    });
  });

  describe('config mapping', function () {
    it('should expose the config object from app.config', function () {
      assert(app.config.config);
      assert(typeof app.config.config === 'object');
    });

    it('should add a set method to config', function () {
      assert(typeof app.config.config.set === 'function');
    });
    it('should add a get method to config', function () {
      assert(typeof app.config.config.get === 'function');
    });
    it('should add a del method to config', function () {
      assert(typeof app.config.config.del === 'function');
    });
  });

  describe('use', function() {
    beforeEach(function() {
      app = verb();
      app.use(config());
    });

    it('should use a plugin', function(cb) {
      app.once('use', function() {
        cb();
      });

      app.config.process({use: 'test/fixtures/plugins/a'});
    });

    it('should use a plugin from a cwd', function(cb) {
      app.once('use', function() {
        cb();
      });

      app.config.process({
        cwd: 'test/fixtures/plugins',
        use: 'a'
      });
    });

    it('should throw an error when plugin is not found', function(cb) {
      try {
        app.config.process({
          cwd: 'test/fixtures/plugins',
          use: 'd'
        });
        assert(new Error('expected an error'));
      } catch(err) {
        assert(err);
        assert(err.message);
        assert(err.message === 'cannot find plugin: d');
        cb();
      }
    });

    it('should use an array of plugins from a cwd', function(cb) {
      var fns = 0;
      app.on('use', function() {
        fns++;
      });

      app.config.process({
        cwd: 'test/fixtures/plugins',
        use: 'a,b,c'
      });

      assert(fns === 3);
      cb();
    });
  });

  describe('map', function() {
    beforeEach(function() {
      app = verb();
      app.use(config());
    });

    it('should process an object of flags', function(cb) {
      app.on('option', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process({option: {a: 'b'}});
    });

    it('should process an object passed to config', function(cb) {
      app = verb();
      app.use(config({option: {a: 'b'}}));

      app.on('option', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process();
    });

    it('should process an array passed to config', function(cb) {
      app = verb();
      app.use(config([{option: {a: 'b'}}]));

      app.on('option', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process();
    });

    it('should be chainable', function(cb) {
      app.config.alias('a', 'b')
        .alias('b', 'c')
        .alias('c', 'set')
        .map('set')

      app.on('set', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process({c: {a: 'b'}});
    });

    it('should add properties to app.config.config', function (cb) {
      app.config.map('foo', 'set');
      app.config.map('bar', 'get');
      var called = 0;

      app.on('set', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        called++;
      });

      app.on('get', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        called++;
      });

      app.config.process({set: {a: 'b'}, get: 'a'});
      assert(called === 2);
      cb();
    });
  });

  describe('store.map', function() {
    beforeEach(function() {
      app = verb();
      app.use(config());
    });

    it('should expose `store.config', function () {
      assert(app.store.config);
      assert(typeof app.store.config === 'function');
    });

    it('should not blow up if store plugin is not used', function () {
      var foo = verb();
      delete foo.store;
      foo.use(config());
      assert(typeof foo.store === 'undefined');
    });

    it('should add properties to app.store.config.config', function (cb) {
      app.store.config.alias('foo', 'set');
      app.store.config.alias('bar', 'get');
      var called = 0;

      app.store.on('set', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        called++;
      });

      app.store.on('get', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        called++;
      });

      app.store.config.process({foo: {a: 'b'}, bar: 'a'});
      assert(called === 2);
      cb();
    });

    it('should work as a function', function (cb) {
      app.store.config({
        foo: 'set',
        bar: 'get'
      });

      var called = 0;

      app.store.on('set', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        called++;
      });

      app.store.on('get', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        called++;
      });

      app.store.config.process({foo: {a: 'b'}, bar: 'a'});
      assert(called === 2);
      cb();
    });
  });

  describe('process', function() {
    it('should process an object of flags', function(cb) {
      app.on('option', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process({option: {a: 'b'}});
    });
  });
});

describe('should handle methods added by other plugins', function () {
  beforeEach(function() {
    app = verb();
    app.use(config());
  });

  afterEach(function() {
    app.store.del({force: true});
  });

  describe('store', function () {
    it('should add a store method to config', function () {
      assert(typeof app.config.config.store === 'function');
    });
  });

  describe('option', function () {
    it('should add an option method to config', function () {
      assert(typeof app.config.config.option === 'function');
    });
  });

  describe('data', function () {
    it('should add a data method to config', function () {
      assert(typeof app.config.config.data === 'function');
    });
  });
});

describe('events', function () {
  beforeEach(function() {
    app = verb();
    app.use(config());
  });

  afterEach(function() {
    app.store.del({force: true});
  });

  describe('set', function () {
    it('should emit a set event', function (cb) {
      var argv = expand(['--set=a:b']);

      app.on('set', function(key, val) {
        assert(key);
        assert(val);
        assert(app.a === 'b');
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });
  });

  describe('get', function () {
    it('should emit a get event', function (cb) {
      var argv = expand(['--get=a']);
      app.set('a', 'b');

      app.on('get', function(key, val) {
        assert(key);
        assert(val);
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });
  });

  describe('del', function () {
    it('should emit a del event', function (cb) {
      var argv = expand(['--del=a']);
      app.set('a', 'b');

      app.on('del', function(key) {
        assert(key);
        assert(key === 'a');
        assert(typeof app.a === 'undefined');
        cb();
      });

      app.config.process(argv);
    });
  });

  describe('option', function () {
    it('should emit an option event', function (cb) {
      var argv = expand(['--option=a:b']);

      app.on('option', function(key, val) {
        assert(key);
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });
  });

  describe('data', function () {
    it('should emit a data event', function (cb) {
      var argv = expand(['--data=a:b']);

      app.on('data', function(args) {
        assert(Array.isArray(args));
        assert(args.length === 1);
        assert(args[0].a === 'b');
        cb();
      });

      app.config.process(argv);
    });
  });

  describe('store', function () {
    it('should emit a store.set event', function (cb) {
      var argv = expand(['--store.set=a:b']);
      app.store.on('set', function(key, val) {
        assert(key);
        assert(val);
        assert(app.store.data.a === 'b');
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });

    it('should emit a store.get event', function (cb) {
      var argv = expand(['--store.get=a']);
      app.store.set('a', 'b');

      app.store.on('get', function(key, val) {
        assert(key);
        assert(val);
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });

    it('should emit a store.del event', function (cb) {
      var argv = expand(['--store.del=a,b']);
      app.store.set('a', 'aaa');
      app.store.set('b', 'bbb');
      var keys = [];

      app.store.on('del', function(key) {
        keys.push(key);
      });

      app.config.process(argv);
      assert(keys.length === 2);
      process.nextTick(function () {
        assert(Object.keys(app.store.data).length === 2);
      });
      cb();
    });

    it('should delete the entire store', function (cb) {
      var argv = expand(['--store.del=force:true']);
      app.store.set('a', 'aaa');
      app.store.set('b', 'bbb');
      var keys = [];

      app.store.on('del', function(key) {
        keys.push(key);
      });

      app.config.process(argv);
      assert(keys.length === 2);
      process.nextTick(function () {
        assert(Object.keys(app.store.data).length === 0);
      });
      cb();
    });
  });
});

describe('aliases', function () {
  beforeEach(function() {
    app = verb();
    app.use(config());
  });

  afterEach(function() {
    app.store.del({force: true});
  });

  describe('config', function () {
    it('should map an object to methods', function (cb) {
      var argv = expand(['--set=a:b']);
      app.config({
        set: 'set'
      });

      app.on('set', function(key, val) {
        assert(key);
        assert(val);
        assert(app.a === 'b');
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });

    it('should use custom functions', function (cb) {
      var argv = expand(['--foo=a:b']);
      app.config({
        set: 'set',
        foo: function (key, val) {
          app.set(key, val);
        }
      });

      app.on('set', function(key, val) {
        assert(key);
        assert(val);
        assert(app.a === 'b');
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });

    it('should use alias mappings', function (cb) {
      var argv = expand(['--foo=a:b']);
      app.config({
        set: 'set',
        foo: 'set'
      });

      app.on('set', function(key, val) {
        assert(key);
        assert(val);
        assert(app.a === 'b');
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });

    it('should expose config.map', function (cb) {
      var argv = expand(['--set=a:b']);
      app.config.map('set');

      app.on('set', function(key, val) {
        assert(key);
        assert(val);
        assert(app.a === 'b');
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });

    it('should expose config.alias', function (cb) {
      var argv = expand(['--set=a:b']);
      app.config.alias('foo', 'set');

      app.on('set', function(key, val) {
        assert(key);
        assert(val);
        assert(app.a === 'b');
        assert(key === 'a');
        assert(val === 'b');
        cb();
      });

      app.config.process(argv);
    });

    it('should throw if args are invalid', function (cb) {
      try {
        app.config([]);
        cb(new Error('expected an error'));
      } catch(err) {
        assert(err);
        assert(err.message);
        assert(err.message === 'expected key to be a string or object');
        cb();
      }
    });
  });
});
