'use strict';

require('mocha');
var assert = require('assert');
var option = require('base-option');
var Generate = require('..');
var generate;

describe('cache', function() {
  describe('set', function() {
    beforeEach(function() {
      generate = new Generate();
      generate.use(option());
    });

    it('should set an instance', function() {
      generate.generators.set('foo', function() {});
      assert(generate.generators.hasOwnProperty('foo'));
    });

    it('should set an instance with a parent instance', function() {
      generate.generators.set('foo', function() {});
      assert(generate.generators.hasOwnProperty('foo'));
    });

    it('should set options from the parent instance on new instances', function() {
      generate = new Generate({a: 'b'});
      assert.equal(generate.options.a, 'b');

      generate.generators.set('foo', function() {});
      assert(generate.generators.hasOwnProperty('foo'));
      assert.equal(generate.generators.foo.options.a, 'b');
    });

    it('should set options from the parent instance on sub-generators', function(cb) {
      generate = new Generate({a: 'b'});
      assert.equal(generate.options.a, 'b');

      generate.generators.set('foo', function(app) {
        app.generators.set('bar', function(bar) {
          assert.equal(bar.options.a, 'b');
          cb();
        });
      });

      generate.getGenerator('foo.bar');
    });

    it('should set parent options on deeply nested sub-generators', function(cb) {
      generate = new Generate({a: 'b'});
      generate.use(option());

      assert.equal(generate.options.a, 'b');

      generate.option('c', 'd');

      generate.generators.set('foo', function(foo) {
        assert.equal(foo.options.a, 'b');

        foo.generators.set('bar', function(bar) {
          assert.equal(bar.options.a, 'b');

          bar.generators.set('baz', function(baz) {
            assert.equal(baz.options.a, 'b');

            baz.generators.set('qux', function(qux) {
              assert.equal(qux.options.a, 'b');

              qux.generators.set('fez', function(fez) {
                assert.equal(fez.options.a, 'b');

                cb();
              });
            });
          });
        });
      });
      generate.getGenerator('foo.bar.baz.qux.fez');
    });

    it('should expose the base instance as the second arg', function(cb) {
      generate = new Generate({a: 'b'});
      generate.use(option());

      assert.equal(generate.options.a, 'b');

      generate.option('c', 'd');

      generate.generators.set('foo', function(foo, fooBase) {
        foo.generators.set('bar', function(bar, barBase) {
          bar.generators.set('baz', function(baz, bazBase) {
            baz.generators.set('qux', function(qux, quxBase) {
              qux.generators.set('fez', function(fez, fezBase) {
                assert(fezBase.hasGenerator('foo'));
                assert(!fezBase.hasGenerator('bar'));
                assert(fezBase.hasGenerator('foo.bar'));
                cb();
              });
            });
          });
        });
      });
      generate.getGenerator('foo.bar.baz.qux.fez');
    });

    it('should not merge generator options back upstream', function() {
      generate = new Generate({a: 'b'});
      generate.use(option());

      assert.equal(generate.options.a, 'b');

      generate.generators.set('foo', function() {});
      generate.option('one', 'two');

      var foo = generate.getGenerator('foo');
      foo.option('x', 'z');

      assert.equal(foo.options.a, 'b');
      assert.equal(foo.options.x, 'z');
      assert.equal(typeof generate.options.x, 'undefined');
    });

    it('should break the options reference after instantiation', function() {
      generate = new Generate({a: 'b'});
      generate.use(option());

      assert.equal(generate.options.a, 'b');

      generate.generators.set('foo', function() {});
      generate.option('one', 'two');

      var foo = generate.getGenerator('foo');
      assert.equal(foo.options.a, 'b');
      assert.equal(typeof foo.options.one, 'undefined');
    });
  });

  describe('get', function() {
    beforeEach(function() {
      generate = new Generate();
    });

    it('should get an instance from app.generators', function() {
      generate.generators.set('foo', function() {});
      var foo = generate.generators.get('foo');
      assert(foo);
      assert(foo.isGenerator);
    });
  });

  describe('plugins', function() {
    beforeEach(function() {
      generate = new Generate();
    });

    it('should add plugins from a parent generator to child generators', function() {
      generate.use(option());

      generate.generators.set('foo', function() {});
      var foo = generate.generators.get('foo');
      assert(foo);
      assert(foo.hasOwnProperty('option'));
      assert.equal(typeof foo.option, 'function');
    });

    it('should add parent plugins to deeply nested generators', function(cb) {
      generate.use(option());

      generate.generators.set('foo', function(foo) {
        foo.use(function fn() {
          this.aaa = 'aaa';
          return fn;
        });

        assert.equal(this.aaa, 'aaa');
        assert.equal(typeof this.option, 'function');

        foo.generators.set('bar', function(bar) {
          bar.use(function() {
            this.bbb = 'bbb';
          });

          assert.equal(this.aaa, 'aaa');
          assert.equal(typeof this.option, 'function');

          bar.generators.set('baz', function(baz) {
            baz.use(function fn() {
              this.ccc = 'ccc';
              return fn;
            });

            assert.equal(this.aaa, 'aaa');
            assert.equal(typeof this.option, 'function');

            baz.generators.set('qux', function(qux) {
              qux.use(function() {
                this.ddd = 'ddd';
              });

              assert.equal(this.ccc, 'ccc');
              assert.equal(this.aaa, 'aaa');
              assert.equal(typeof this.option, 'function');

              qux.generators.set('fez', function(fez) {
                fez.use(function() {
                  this.eee = 'eee';
                });

                assert.equal(this.ccc, 'ccc');
                assert.equal(this.aaa, 'aaa');
                assert.equal(typeof this.option, 'function');

                cb();
              });
            });
          });
        });
      });

      generate.getGenerator('foo.bar.baz.qux.fez');
    });
  });
});
