'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Verb = require('..');
var app;

var fixtures = path.resolve.bind(path, __dirname + '/fixtures');

describe('.register plugin', function() {
  it('should register as a plugin', function() {
    var app = new Verb();
    assert(app.registered.hasOwnProperty('base-generators'));
  });
});

describe('.register', function() {
  beforeEach(function() {
    app = new Verb();
    app.initVerb({});
  });

  describe('properties', function() {
    it('should expose a configfile getter/setter', function() {
      assert.equal(typeof app.configfile, 'string');
    });

    it('should set configfile to verbfile.js by default', function() {
      assert.equal(app.configfile, 'verbfile.js');
    });

    it('should set configfile', function() {
      app.configfile = 'foo.js';
      assert.equal(app.configfile, 'foo.js');
    });
  });

  describe('function', function() {
    it('should get a generator registered as a function', function() {
      app.register('foo', function() {});
      var foo = app.getGenerator('foo');
      assert(foo);
      assert.equal(foo.env.alias, 'foo');
    });

    it('should get a task from a generator registered as a function', function() {
      app.register('foo', function(foo) {
        foo.task('default', function() {});
      });
      var generator = app.getGenerator('foo');
      assert(generator);
      assert(generator.tasks);
      assert(generator.tasks.hasOwnProperty('default'));
    });

    it('should get a sub-generator from a generator registered as a function', function() {
      app.register('foo', function(foo) {
        foo.register('bar', function(bar) {});
      });
      var bar = app.getGenerator('foo.bar');
      assert(bar);
      assert.equal(bar.env.alias, 'bar');
    });

    it('should get a sub-generator from a generator registered as a function', function() {
      app.register('foo', function(foo) {
        foo.register('bar', function(bar) {
          bar.task('something', function() {});
        });
      });
      var bar = app.getGenerator('foo.bar');
      assert(bar);
      assert(bar.tasks);
      assert(bar.tasks.hasOwnProperty('something'));
    });

    it('should get a deeply-nested sub-generator registered as a function', function() {
      app.register('foo', function(foo) {
        foo.register('bar', function(bar) {
          bar.register('baz', function(baz) {
            baz.register('qux', function(qux) {
              qux.task('qux-one', function() {});
            });
          });
        });
      });

      var qux = app.getGenerator('foo.bar.baz.qux');
      assert(qux);
      assert(qux.tasks);
      assert(qux.tasks.hasOwnProperty('qux-one'));
    });

    it('should expose the instance from each generator', function() {
      app.register('foo', function(foo) {
        foo.register('bar', function(bar) {
          bar.register('baz', function(baz) {
            baz.register('qux', function(qux) {
              qux.task('qux-one', function() {});
            });
          });
        });
      });

      var qux = app
        .getGenerator('foo')
        .getGenerator('bar')
        .getGenerator('baz')
        .getGenerator('qux');

      assert(qux);
      assert(qux.tasks);
      assert(qux.tasks.hasOwnProperty('qux-one'));
    });

    it('should fail when the wrong generator name is given', function() {
      app.register('foo', function(foo) {
        foo.register('bar', function(bar) {
          bar.register('baz', function(baz) {
            baz.register('qux', function(qux) {
            });
          });
        });
      });
      var fez = app.getGenerator('foo.bar.fez');
      assert.equal(typeof fez, 'undefined');
    });

    it('should expose the `base` instance as the second param', function(cb) {
      app.register('foo', function(foo, base) {
        assert(app.generators.hasOwnProperty('foo'));
        cb();
      });
      app.getGenerator('foo');
    });

    it('should expose sibling generators on the `base` instance', function(cb) {
      app.register('foo', function(foo, base) {
        foo.task('abc', function() {});
      });
      app.register('bar', function(bar, base) {
        assert(app.generators.hasOwnProperty('foo'));
        assert(app.generators.hasOwnProperty('bar'));
        cb();
      });

      app.getGenerator('foo');
      app.getGenerator('bar');
    });
  });
  
  describe('alias', function() {
    it('should use a custom function to create the alias', function() {
      app.option('alias', function(name) {
        return name.slice(name.lastIndexOf('-') + 1);
      });

      app.register('base-abc-xyz', function() {});
      assert(app.generators.hasOwnProperty('xyz'));
    });
  });

  describe('path', function() {
    it('should register a generator function by name', function() {
      app.register('foo', function() {});
      assert(app.generators.hasOwnProperty('foo'));
    });

    it('should register a generator function by alias', function() {
      app.register('verb-generate-abc', function() {});
      assert(app.generators.hasOwnProperty('abc'));
    });

    it('should register a generator by dirname', function() {
      app.register('a', fixtures('generators/a'));
      assert(app.generators.hasOwnProperty('a'));
    });

    it('should register a generator from a configfile filepath', function() {
      app.register('verb-generate-abc', fixtures('generators/a/verbfile.js'));
      assert(app.generators.hasOwnProperty('abc'));
    });

    it('should throw when a generator does not expose the instance', function(cb) {
      try {
        app.register('not-exposed', require(fixtures('not-exposed.js')));
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'generator instances must be exposed with module.exports');
        cb();
      }
    });
  });

  describe('instance', function() {
    it('should register an instance', function() {
      app.register('verb-generate-inst', new Verb());
      assert(app.generators.hasOwnProperty('inst'));
    });

    it('should get a generator that was registered as an instance', function() {
      var foo = new Verb();
      foo.task('default', function() {});
      app.register('foo', foo);
      assert(app.getGenerator('foo'));
    });

    it('should register multiple instances', function() {
      var foo = new Verb();
      var bar = new Verb();
      var baz = new Verb();
      app.register('foo', foo);
      app.register('bar', bar);
      app.register('baz', baz);
      assert(app.getGenerator('foo'));
      assert(app.getGenerator('bar'));
      assert(app.getGenerator('baz'));
    });

    it('should get tasks from a generator that was registered as an instance', function() {
      var foo = new Verb();
      foo.task('default', function() {});
      app.register('foo', foo);
      var generator = app.getGenerator('foo');
      assert(generator.tasks);
      assert(generator.tasks.hasOwnProperty('default'));
    });

    it('should get sub-generators from a generator registered as an instance', function() {
      var foo = new Verb();
      foo.register('bar', function() {});
      app.register('foo', foo);
      var generator = app.getGenerator('foo.bar');
      assert(generator);
    });

    it('should get tasks from sub-generators registered as an instance', function() {
      var foo = new Verb();
      foo.register('bar', function(bar) {
        bar.task('whatever', function() {});
      });
      app.register('foo', foo);
      var generator = app.getGenerator('foo.bar');
      assert(generator.tasks);
      assert(generator.tasks.hasOwnProperty('whatever'));
    });
  });
});
