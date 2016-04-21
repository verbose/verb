'use strict';

require('mocha');
var assert = require('assert');
var Generate = require('..');
var generate;

describe('generators.events', function() {
  describe('generator', function() {
    beforeEach(function() {
      generate = new Generate();
    });

    it('should emit generator when a generator is registered', function(cb) {
      generate = new Generate();
      generate.on('generator', function(name) {
        assert.equal(name, 'foo');
        cb();
      });

      generate.register('foo', function() {});
    });

    it('should emit error on base when a base generator emits an error', function(cb) {
      generate = new Generate();
      var called = 0;

      generate.on('error', function(err) {
        assert.equal(err.message, 'whatever');
        called++;
      });

      generate.register('foo', function(app) {
        app.emit('error', new Error('whatever'));
      });

      generate.getGenerator('foo');
      assert.equal(called, 1);
      cb();
    });

    it('should emit error on base when a base generator throws an error', function(cb) {
      generate = new Generate();
      var called = 0;

      generate.on('error', function(err) {
        assert.equal(err.message, 'whatever');
        called++;
      });

      generate.register('foo', function(app) {
        app.task('default', function(cb) {
          cb(new Error('whatever'));
        });
      });

      generate.getGenerator('foo')
        .build(function(err) {
          assert.equal(called, 1);
          cb();
        });

    });

    it('should emit errors on base from deeply nested generators', function(cb) {
      generate = new Generate();
      var called = 0;

      generate.on('error', function(err) {
        assert.equal(err.message, 'whatever');
        called++;
      });

      generate.register('a', function() {
        this.register('b', function() {
          this.register('c', function() {
            this.register('d', function() {
              this.task('default', function(cb) {
                cb(new Error('whatever'));
              });
            });
          });
        });
      });

      generate.getGenerator('a.b.c.d')
        .build(function(err) {
          assert.equal(called, 1);
          cb();
        });

    });

    it('should bubble up errors to all parent generators', function(cb) {
      generate = new Generate();
      var called = 0;

      generate.on('error', function(err) {
        assert.equal(err.message, 'whatever');
        called++;
      });

      function count(err) {
        called++;
      }

      generate.register('a', function() {
        this.on('error', count);

        this.register('b', function() {
          this.on('error', count);

          this.register('c', function() {
            this.on('error', count);

            this.register('d', function() {
              this.on('error', count);

              this.task('default', function(cb) {
                cb(new Error('whatever'));
              });
            });
          });
        });
      });

      generate.getGenerator('a.b.c.d')
        .build(function(err) {
          assert.equal(called, 5);
          cb();
        });
    });
  });
});
