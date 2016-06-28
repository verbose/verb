'use strict';

process.env.NODE_ENV = 'test';

require('mocha');
var fs = require('fs');
var assert = require('assert');
var questions = require('base-questions');
var config = require('base-config-process');
var store = require('base-store');
var App = require('..');
var app, base, site;

describe('app.questions', function() {
  describe('plugin', function() {
    beforeEach(function() {
      base = new App();
      base.use(config());
      base.use(questions());
      base.use(store('base-questions-tests/base'));

      app = new App();
      app.use(config());
      app.use(questions());
      app.use(store('base-questions-tests/app'));
    });

    it('should expose a `questions` object on "app"', function() {
      assert.equal(typeof app.questions, 'object');
    });

    it('should expose a `set` method on "app.questions"', function() {
      assert.equal(typeof app.questions.set, 'function');
    });
    it('should expose a `get` method on "app.questions"', function() {
      assert.equal(typeof app.questions.get, 'function');
    });
    it('should expose an `ask` method on "app.questions"', function() {
      assert.equal(typeof app.questions.ask, 'function');
    });

    it('should expose an `ask` method on "app"', function() {
      assert.equal(typeof app.ask, 'function');
    });
    it('should expose a `question` method on "app"', function() {
      assert.equal(typeof app.question, 'function');
    });
  });

  if (process.env.TRAVIS) {
    return;

    describe('app.ask', function() {
      beforeEach(function() {
        app = new App();
        app.use(config());
        app.use(questions());
        app.use(store('base-questions-tests/ask'));
      });

      afterEach(function() {
        app.store.del({force: true});
        app.questions.clear();
        app.cache.data = {};
      });

      it.skip('should force all questions to be asked', function(cb) {
        app.questions.option('init', 'author');
        app.ask({force: true}, function(err, answers) {
          console.log(answers)
          cb();
        });
      });

      it('should store a question:', function() {
        app.question('a', 'b');
        assert(app.questions);
        assert(app.questions.cache);
        assert(app.questions.cache.a);
        assert.equal(app.questions.cache.a.name, 'a');
        assert.equal(app.questions.cache.a.message, 'b');
      });

      it.skip('should re-init a specific question:', function(cb) {
        this.timeout(20000);
        app.question('a', 'b');
        app.question('c', 'd');
        app.question('e', 'f');
        app.data({a: 'b'});

        app.questions.get('e')
          .force()

        app.ask(function(err, answers) {
          console.log(answers);
          cb();
        });
      });

      it('should ask a question defined on `ask`', function(cb) {
        app.data('name', 'Brian Woodward');

        app.ask('name', function(err, answers) {
          if(err) return cb(err)
          assert.equal(answers.name, 'Brian Woodward');
          cb();
        });
      });

      it('should ask a question and use a `cache.data` value to answer:', function(cb) {
        app.question('a', 'this is a question');
        app.data('a', 'b');

        app.ask('a', function(err, answers) {
          if(err) return cb(err)
          assert.equal(answers.a, 'b');

          app.data('a', 'zzz');
          app.ask('a', function(err, answers) {
            if(err) return cb(err)
            assert.equal(answers.a, 'zzz');
            cb();
          })
        });
      });

      it('should ask a question and use a `store.data` value to answer:', function(cb) {
        app.question('a', 'this is another question');
        app.store.set('a', 'c');
        app.ask('a', function(err, answers) {
          if (err) return cb(err);
          assert(answers);
          assert.equal(answers.a, 'c');
          cb();
        })
      });

      it('should ask a question and use a config value to answer:', function(cb) {
        app.question('a', 'b');
        app.config.process({data: {a: 'foo'}}, function(err) {
          if (err) return cb(err);

          app.store.set('a', 'c');

          app.ask('a', function(err, answer) {
            if (err) return cb(err);
            assert(answer);
            assert.equal(answer.a, 'foo');
            cb();
          });
        });
      });

      it('should prefer `cache.data` to `store.data`', function(cb) {
        app.question('a', 'b');
        app.data('a', 'b');
        app.store.set('a', 'c');

        app.ask('a', function(err, answer) {
          if (err) return cb(err);
          assert(answer);
          assert.equal(answer.a, 'b');
          cb();
        })
      });

      it('should update data with data loaded by config', function(cb) {
        app.question('a', 'this is a question');
        app.data('a', 'b');

        app.config.process({data: {a: 'foo'}}, function(err) {
          if (err) return cb(err);

          app.ask('a', function(err, answer) {
            if (err) return cb(err);

            assert(answer);
            assert.equal(answer.a, 'foo');
            cb();
          });
        });
      });
    });

    describe('session data', function() {
      before(function() {
        site = new App();
        site.use(config());
        site.use(questions());
        site.use(store('base-questions-tests/site'));

        app = new App();
        app.use(config());
        app.use(questions());
        app.use(store('base-questions-tests/ask'));
      });

      after(function() {
        site.store.del({force: true});
        site.questions.clear();

        app.store.del({force: true});
        app.questions.clear();
      });

      it('[app] should ask a question and use a `cache.data` value to answer:', function(cb) {
        app.question('package.name', 'this is a question');
        app.data('package.name', 'base-questions');

        app.ask('package.name', function(err, answers) {
          if(err) return cb(err)
          assert.equal(answers.package.name, 'base-questions');

          app.data('package.name', 'foo-bar-baz');
          app.ask('package.name', function(err, answers) {
            if(err) return cb(err)
            assert.equal(answers.package.name, 'foo-bar-baz');
            cb();
          })
        });
      });

      it('[site] should ask a question and use a `cache.data` value to answer:', function(cb) {
        site.question('package.name', 'this is a question');
        site.data('package.name', 'base-questions');

        site.ask('package.name', function(err, answers) {
          if(err) return cb(err)
          assert.equal(answers.package.name, 'base-questions');

          site.data('package.name', 'foo-bar-baz');
          site.ask('package.name', function(err, answers) {
            if(err) return cb(err)
            assert.equal(answers.package.name, 'foo-bar-baz');
            cb();
          })
        });
      });

      it('[app] should ask a question and use a `store.data` value to answer:', function(cb) {
        app.question('author.name', 'this is another question');
        app.store.set('author.name', 'Brian Woodward');
        app.ask('author.name', function(err, answers) {
          if (err) return cb(err);
          assert(answers);
          assert.equal(answers.author.name, 'Brian Woodward');
          cb();
        })
      });

      it('[site] should ask a question and use a `store.data` value to answer:', function(cb) {
        site.question('author.name', 'this is another question');
        site.store.set('author.name', 'Jon Schlinkert');
        site.ask('author.name', function(err, answers) {
          if (err) return cb(err);
          assert(answers);
          assert.equal(answers.author.name, 'Brian Woodward');
          cb();
        })
      });

      it('[app] should ask a question and use a config value to answer:', function(cb) {
        app.question('foo', 'Username?');
        app.config.process({data: {foo: 'jonschlinkert'}}, function(err) {
          if (err) return cb(err);

          app.store.set('foo', 'doowb');

          app.ask('foo', function(err, answer) {
            if (err) return cb(err);
            assert(answer);
            assert.equal(answer.foo, 'jonschlinkert');
            cb();
          });
        });
      });

      it('[site] should ask a question and use a config value to answer:', function(cb) {
        site.question('foo', 'Username?');
        site.config.process({data: {foo: 'doowb'}}, function(err) {
          if (err) return cb(err);

          site.ask('foo', function(err, answer) {
            if (err) return cb(err);
            assert(answer);
            assert.equal(answer.foo, 'doowb');
            cb();
          });
        });
      });
    });
  }
});
