'use strict';

require('mocha');
require('generate-foo/generator.js');

var path = require('path');
var assert = require('assert');
var npm = require('npm-install-global');
var utils = require('generator-util');
var gm = require('global-modules');
var isAbsolute = require('is-absolute');
var resolve = require('resolve');
var Base = require('..');
var base;

var fixture = path.resolve.bind(path, __dirname, 'fixtures/generators');
function resolver(search, app) {
  try {
    if (isAbsolute(search.name)) {
      search.name = require.resolve(search.name);
    } else {
      search.name = resolve.sync(search.name, {basedir: gm});
    }
    search.app = app.register(search.name, search.name);
  } catch (err) {}
}

describe('.extendWith', function() {
  before(function(cb) {
    if (!utils.exists(path.resolve(gm, 'generate-bar'))) {
      npm.install('generate-bar', cb);
    } else {
      cb();
    }
  });

  beforeEach(function() {
    base = new Base();
    base.option('toAlias', function(name) {
      return name.replace(/^generate-/, '');
    });

    base.on('unresolved', resolver);
  });

  it('should throw an error when a generator is not found', function(cb) {
    try {
      base.register('foo', function(app) {
        app.extendWith('fofoofofofofof');
      });

      base.getGenerator('foo');
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'cannot find generator: "fofoofofofofof"');
      cb();
    }
  });

  it('should extend a generator with settings in the default generator', function(cb) {
    var count = 0;

    base.register('foo', function(app) {
      app.task('default', function(next) {
        assert.equal(app.options.foo, 'bar');
        assert.equal(app.cache.data.foo, 'bar');
        count++;
        next();
      });
    });

    base.register('default', function(app) {
      app.data({foo: 'bar'});
      app.option({foo: 'bar'});
    });

    base.generate('foo', function(err) {
      if (err) return cb(err);
      assert.equal(count, 1);
      cb();
    });
  });

  it('should not extend tasks by default', function(cb) {
    var count = 0;

    base.register('foo', function(app) {
      app.task('default', function(next) {
        assert(app.tasks.hasOwnProperty('default'));
        assert(!app.tasks.hasOwnProperty('a'));
        assert(!app.tasks.hasOwnProperty('b'));
        assert(!app.tasks.hasOwnProperty('c'));
        count++;
        next();
      });
    });

    base.register('default', function(app) {
      app.task('a', function(next) {
        next();
      });
      app.task('b', function(next) {
        next();
      });
      app.task('c', function(next) {
        next();
      });
    });

    base.generate('foo', function(err) {
      if (err) return cb(err);
      assert.equal(count, 1);
      cb();
    });
  });

  it('should get a named generator', function(cb) {
    var count = 0;

    base.register('foo', function(app) {
      app.extendWith('bar');
      count++;
    });

    base.register('bar', function(app) {
      app.task('a', function() {});
      app.task('b', function() {});
      app.task('c', function() {});
    });

    base.getGenerator('foo');
    assert.equal(count, 1);
    cb();
  });

  it('should extend a generator with a named generator', function(cb) {
    base.register('foo', function(app) {
      assert(!app.tasks.a);
      assert(!app.tasks.b);
      assert(!app.tasks.c);

      app.extendWith('bar');
      assert(app.tasks.a);
      assert(app.tasks.b);
      assert(app.tasks.c);
      cb();
    });

    base.register('bar', function(app) {
      app.task('a', function() {});
      app.task('b', function() {});
      app.task('c', function() {});
    });

    base.getGenerator('foo');
  });

  it('should extend a generator with an array of generators', function(cb) {
    base.register('foo', function(app) {
      assert(!app.tasks.a);
      assert(!app.tasks.b);
      assert(!app.tasks.c);

      app.extendWith(['bar', 'baz', 'qux']);
      assert(app.tasks.a);
      assert(app.tasks.b);
      assert(app.tasks.c);
      cb();
    });

    base.register('bar', function(app) {
      app.task('a', function() {});
    });

    base.register('baz', function(app) {
      app.task('b', function() {});
    });

    base.register('qux', function(app) {
      app.task('c', function() {});
    });

    base.getGenerator('foo');
  });

  describe('invoke generators', function(cb) {
    it('should extend with a generator instance', function(cb) {
      base.register('foo', function(app) {
        var bar = app.getGenerator('bar');
        app.extendWith(bar);

        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      base.register('bar', function(app) {
        app.isBar = true;
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      base.getGenerator('foo');
    });

    it('should invoke a named generator', function(cb) {
      base.register('foo', function(app) {
        app.extendWith('bar');

        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      base.register('bar', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      base.getGenerator('foo');
    });
  });

  describe('extend generators', function(cb) {
    it('should extend a generator with a generator invoked by name', function(cb) {
      base.register('foo', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('bar');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      base.register('bar', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      base.getGenerator('foo');
    });

    it('should extend a generator with a generator invoked by alias', function(cb) {
      base.register('foo', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('qux');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      base.register('generate-qux', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      base.getGenerator('qux');
      base.getGenerator('foo');
    });

    it('should extend with a generator invoked by filepath', function(cb) {
      base.register('foo', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith(fixture('qux'));
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      base.getGenerator('foo');
    });

    it('should extend with a generator invoked from node_modules by name', function(cb) {
      base.register('abc', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('generate-foo');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      base.getGenerator('abc');
    });

    it('should extend with a generator invoked from node_modules by name on a default instance', function() {
      var app = new Base();

      app.on('unresolved', resolver);
      app.option('toAlias', function(name) {
        return name.replace(/^generate-/, '');
      });

      assert(!app.tasks.a);
      assert(!app.tasks.b);
      assert(!app.tasks.c);

      app.extendWith('generate-foo');
      assert(app.tasks.a);
      assert(app.tasks.b);
      assert(app.tasks.c);
    });

    it('should use a generator from node_modules as a plugin', function() {
      var app = new Base();

      app.option('toAlias', function(name) {
        return name.replace(/^generate-/, '');
      });

      assert(!app.tasks.a);
      assert(!app.tasks.b);
      assert(!app.tasks.c);

      app.use(require('generate-foo'));
      assert(app.tasks.a);
      assert(app.tasks.b);
      assert(app.tasks.c);
    });

    it('should extend with a generator invoked from global modules by name', function(cb) {
      base.register('zzz', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);
        app.extendWith('generate-bar');

        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      base.getGenerator('zzz');
    });

    it('should extend with a generator invoked from global modules by alias', function(cb) {
      base.register('generate-bar');

      base.register('zzz', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('bar');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      base.getGenerator('zzz');
    });
  });

  describe('sub-generators', function(cb) {
    it('should invoke sub-generators', function(cb) {
      base.register('foo', function(app) {
        app.register('one', function(app) {
          app.task('a', function() {});
        });
        app.register('two', function(app) {
          app.task('b', function() {});
        });

        app.extendWith('one');
        app.extendWith('two');

        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        cb();
      });

      base.getGenerator('foo');
    });

    it('should invoke a sub-generator on the base instance', function(cb) {
      base.register('foo', function(app) {
        app.extendWith('bar.sub');
        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      base.register('bar', function(app) {
        app.register('sub', function(sub) {
          sub.task('a', function() {});
          sub.task('b', function() {});
          sub.task('c', function() {});
        });
      });

      base.getGenerator('foo');
    });

    it('should invoke a sub-generator from node_modules by name', function(cb) {
      base.register('abc', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('xyz');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      base.register('xyz', function(app) {
        app.extendWith('generate-foo');
      });

      base.getGenerator('abc');
    });

    it('should invoke a sub-generator from node_modules by alias', function(cb) {
      base.register('generate-foo');

      base.register('abc', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('xyz');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      base.register('xyz', function(app) {
        app.extendWith('foo');
      });

      base.getGenerator('abc');
    });

    it('should invoke an array of sub-generators', function(cb) {
      base.register('foo', function(app) {
        app.register('one', function(app) {
          app.task('a', function() {});
        });
        app.register('two', function(app) {
          app.task('b', function() {});
        });

        app.extendWith(['one', 'two']);

        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        cb();
      });

      base.getGenerator('foo');
    });

    it('should invoke sub-generators from sub-generators', function(cb) {
      base.register('foo', function(app) {
        app.register('one', function(sub) {
          sub.register('a', function(a) {
            a.task('a', function() {});
          });
        });

        app.register('two', function(sub) {
          sub.register('a', function(a) {
            a.task('b', function() {});
          });
        });

        app.extendWith('one.a');
        app.extendWith('two.a');

        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        cb();
      });

      base.getGenerator('foo');
    });

    it('should invoke an array of sub-generators from sub-generators', function(cb) {
      base.register('foo', function(app) {
        app.register('one', function(sub) {
          sub.register('a', function(a) {
            a.task('a', function() {});
          });
        });

        app.register('two', function(sub) {
          sub.register('a', function(a) {
            a.task('b', function() {});
          });
        });

        app.extendWith(['one.a', 'two.a']);

        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        cb();
      });

      base.getGenerator('foo');
    });

    it('should invoke sub-generator that invokes another generator', function(cb) {
      base.register('foo', function(app) {
        app.extendWith('bar');
        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      base.register('bar', function(app) {
        app.extendWith('baz');
      });

      base.register('baz', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      base.getGenerator('foo');
    });

    it('should invoke sub-generator that invokes another sub-generator', function(cb) {
      base.register('foo', function(app) {
        app.extendWith('bar.sub');
        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      base.register('bar', function(app) {
        app.register('sub', function(sub) {
          sub.extendWith('baz.sub');
        });
      });

      base.register('baz', function(app) {
        app.register('sub', function(sub) {
          sub.task('a', function() {});
          sub.task('b', function() {});
          sub.task('c', function() {});
        });
      });

      base.getGenerator('foo');
    });

    it('should invoke sub-generator that invokes another sub-generator', function(cb) {
      base.register('foo', function(app) {
        app.extendWith('bar.sub');
        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      base.register('bar', function(app) {
        app.register('sub', function(sub) {
          sub.extendWith('baz.sub');
        });
      });

      base.register('baz', function(app) {
        app.register('sub', function(sub) {
          sub.task('a', function() {});
          sub.task('b', function() {});
          sub.task('c', function() {});
        });
      });

      base.getGenerator('foo');
    });
  });
});
