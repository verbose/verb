'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var gm = require('global-modules');
var utils = require('generator-util');
var commands = require('spawn-commands');
var Generate = require('..');
var generate;
require('generate-foo');

var fixture = path.resolve.bind(path, __dirname, 'fixtures/generators');
function install(name, cb) {
  commands({
    args: ['install', '-g', '--silent', name],
    cmd: 'npm'
  }, cb);
}

describe('app.extendWith', function() {
  before(function(cb) {
    if (!utils.exists(path.resolve(gm, 'generate-bar'))) {
      install('generate-bar', cb);
    } else {
      cb();
    }
  });

  beforeEach(function() {
    generate = new Generate();
    generate.option('toAlias', function(name) {
      return name.replace(/^generate-/, '');
    });
  });

  it('should throw an error when a generator is not found', function(cb) {
    generate.register('foo', function(app) {
      app.extendWith('fofoofofofofof');
    });

    try {
      generate.getGenerator('foo');
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'cannot find generator fofoofofofofof');
      cb();
    }
  });

  it('should get a named generator', function(cb) {
    var count = 0;
    generate.register('foo', function(app) {
      app.extendWith('bar');
      count++;
    });

    generate.register('bar', function(app) {
      app.task('a', function() {});
      app.task('b', function() {});
      app.task('c', function() {});
    });

    generate.getGenerator('foo');
    assert.equal(count, 1);
    cb();
  });

  it('should extend a generator with a named generator', function(cb) {
    generate.register('foo', function(app) {
      assert(!app.tasks.a);
      assert(!app.tasks.b);
      assert(!app.tasks.c);

      app.extendWith('bar');
      assert(app.tasks.a);
      assert(app.tasks.b);
      assert(app.tasks.c);
      cb();
    });

    generate.register('bar', function(app) {
      app.task('a', function() {});
      app.task('b', function() {});
      app.task('c', function() {});
    });

    generate.getGenerator('foo');
  });

  it('should extend a generator with an array of generators', function(cb) {
    generate.register('foo', function(app) {
      assert(!app.tasks.a);
      assert(!app.tasks.b);
      assert(!app.tasks.c);

      app.extendWith(['bar', 'baz', 'qux']);
      assert(app.tasks.a);
      assert(app.tasks.b);
      assert(app.tasks.c);
      cb();
    });

    generate.register('bar', function(app) {
      app.task('a', function() {});
    });

    generate.register('baz', function(app) {
      app.task('b', function() {});
    });

    generate.register('qux', function(app) {
      app.task('c', function() {});
    });

    generate.getGenerator('foo');
  });

  describe('invoke generators', function(cb) {
    it('should extend with a generator instance', function(cb) {
      generate.register('foo', function(app) {
        var bar = app.getGenerator('bar');
        app.extendWith(bar);

        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      generate.register('bar', function(app) {
        app.isBar = true;
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      generate.getGenerator('foo');
    });

    it('should invoke a named generator', function(cb) {
      generate.register('foo', function(app) {
        app.extendWith('bar');

        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      generate.register('bar', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      generate.getGenerator('foo');
    });
  });

  describe('extend generators', function(cb) {
    it('should extend a generator with a generator invoked by name', function(cb) {
      generate.register('foo', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('bar');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      generate.register('bar', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      generate.getGenerator('foo');
    });

    it('should extend a generator with a generator invoked by alias', function(cb) {
      generate.register('foo', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('qux');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      generate.register('generate-qux', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      var qux = generate.getGenerator('qux');
      generate.getGenerator('foo');
    });

    it('should extend with a generator invoked by filepath', function(cb) {
      generate.register('foo', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith(fixture('qux'));
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      generate.getGenerator('foo');
    });

    it('should extend with a generator invoked from node_modules by name', function(cb) {
      generate.register('abc', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('generate-foo');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      generate.getGenerator('abc');
    });

    it('should extend with a generator invoked from global modules by name', function(cb) {
      generate.register('zzz', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);
        app.extendWith('generate-bar');

        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      generate.getGenerator('zzz');
    });

    it('should extend with a generator invoked from global modules by alias', function(cb) {
      generate.register('generate-bar');

      generate.register('zzz', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('bar');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      generate.getGenerator('zzz');
    });
  });

  describe('sub-generators', function(cb) {
    it('should invoke sub-generators', function(cb) {
      generate.register('foo', function(app) {
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

      generate.getGenerator('foo');
    });

    it('should invoke a sub-generator on the base instance', function(cb) {
      generate.register('foo', function(app) {
        app.extendWith('bar.sub');
        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      generate.register('bar', function(app) {
        app.register('sub', function(sub) {
          sub.task('a', function() {});
          sub.task('b', function() {});
          sub.task('c', function() {});
        });
      });

      generate.getGenerator('foo');
    });

    it('should invoke a sub-generator from node_modules by name', function(cb) {
      generate.register('abc', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('xyz');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      generate.register('xyz', function(app) {
        app.extendWith('generate-foo');
      });

      generate.getGenerator('abc');
    });

    it('should invoke a sub-generator from node_modules by alias', function(cb) {
      generate.register('generate-foo');

      generate.register('abc', function(app) {
        assert(!app.tasks.a);
        assert(!app.tasks.b);
        assert(!app.tasks.c);

        app.extendWith('xyz');
        assert(app.tasks.a);
        assert(app.tasks.b);
        assert(app.tasks.c);
        cb();
      });

      generate.register('xyz', function(app) {
        app.extendWith('foo');
      });

      generate.getGenerator('abc');
    });

    it('should invoke an array of sub-generators', function(cb) {
      generate.register('foo', function(app) {
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

      generate.getGenerator('foo');
    });

    it('should invoke sub-generators from sub-generators', function(cb) {
      generate.register('foo', function(app) {
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

      generate.getGenerator('foo');
    });

    it('should invoke an array of sub-generators from sub-generators', function(cb) {
      generate.register('foo', function(app) {
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

      generate.getGenerator('foo');
    });

    it('should invoke sub-generator that invokes another generator', function(cb) {
      generate.register('foo', function(app) {
        app.extendWith('bar');
        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      generate.register('bar', function(app) {
        app.extendWith('baz');
      });

      generate.register('baz', function(app) {
        app.task('a', function() {});
        app.task('b', function() {});
        app.task('c', function() {});
      });

      generate.getGenerator('foo');
    });

    it('should invoke sub-generator that invokes another sub-generator', function(cb) {
      generate.register('foo', function(app) {
        app.extendWith('bar.sub');
        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      generate.register('bar', function(app) {
        app.register('sub', function(sub) {
          sub.extendWith('baz.sub');
        });
      });

      generate.register('baz', function(app) {
        app.register('sub', function(sub) {
          sub.task('a', function() {});
          sub.task('b', function() {});
          sub.task('c', function() {});
        });
      });

      generate.getGenerator('foo');
    });

    it('should invoke sub-generator that invokes another sub-generator', function(cb) {
      generate.register('foo', function(app) {
        app.extendWith('bar.sub');
        assert(app.tasks.hasOwnProperty('a'));
        assert(app.tasks.hasOwnProperty('b'));
        assert(app.tasks.hasOwnProperty('c'));
        cb();
      });

      generate.register('bar', function(app) {
        app.register('sub', function(sub) {
          sub.extendWith('baz.sub');
        });
      });

      generate.register('baz', function(app) {
        app.register('sub', function(sub) {
          sub.task('a', function() {});
          sub.task('b', function() {});
          sub.task('c', function() {});
        });
      });

      generate.getGenerator('foo');
    });
  });
});
