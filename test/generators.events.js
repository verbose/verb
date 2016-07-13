'use strict';

require('mocha');
var assert = require('assert');
var Base = require('..');
var base;

describe('generators events', function() {
  describe('generator', function() {
    beforeEach(function() {
      base = new Base();
    });

    it('should emit generator when a generator is registered', function(cb) {
      base = new Base();
      base.on('generator', function(generator) {
        assert.equal(generator.alias, 'foo');
        cb();
      });

      base.register('foo', function() {});
    });

    it('should emit generator when base.generators.get is called', function(cb) {
      base = new Base();

      base.on('generator', function(generator) {
        assert.equal(generator.alias, 'foo');
        cb();
      });

      base.register('foo', function() {});
      base.getGenerator('foo');
    });

    it('should emit generator.get when base.generators.get is called', function(cb) {
      base = new Base();
      base.on('generator', function(generator) {
        assert.equal(generator.alias, 'foo');
        cb();
      });

      base.register('foo', function() {});
      base.getGenerator('foo');
    });

    it('should emit error on base when a base generator emits an error', function(cb) {
      base = new Base();
      var called = 0;

      base.on('error', function(err) {
        assert.equal(err.message, 'whatever');
        called++;
      });

      base.register('foo', function(app) {
        app.emit('error', new Error('whatever'));
      });

      base.getGenerator('foo');
      assert.equal(called, 1);
      cb();
    });

    it('should emit error on base when a base generator throws an error', function(cb) {
      base = new Base();
      var called = 0;

      base.on('error', function(err) {
        assert.equal(err.message, 'whatever');
        called++;
      });

      base.register('foo', function(app) {
        app.task('default', function(cb) {
          cb(new Error('whatever'));
        });
      });

      base.getGenerator('foo')
        .build(function(err) {
          assert(err);
          assert.equal(called, 1);
          cb();
        });

    });

    it('should emit errors on base from deeply nested generators', function(cb) {
      base = new Base();
      var called = 0;

      base.on('error', function(err) {
        assert.equal(err.message, 'whatever');
        called++;
      });

      base.register('a', function() {
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

      base.getGenerator('a.b.c.d')
        .build(function(err) {
          assert(err);
          assert.equal(called, 1);
          cb();
        });

    });

    it('should bubble up errors to all parent generators', function(cb) {
      base = new Base();
      var called = 0;

      function count() {
        called++;
      }

      base.on('error', function(err) {
        assert.equal(err.message, 'whatever');
        called++;
      });

      base.register('a', function() {
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

      base.getGenerator('a.b.c.d')
        .build(function(err) {
          assert(err);
          assert.equal(called, 6);
          assert.equal(err.message, 'whatever');
          cb();
        });
    });
  });
});
