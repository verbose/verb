'use strict';

require('mocha');
require('should');
var fs = require('fs');
var assert = require('assert');
var support = require('./support');
var config = require('base-config');
var ask = require('base-questions');
var App = support.resolve();
var app;

describe('content', function() {
  beforeEach(function() {
    app = new App();
    app.use(config());
    app.use(ask());
  });

  afterEach(function(cb) {
    app.questions.del('a');
    cb();
  });

  it('should store a question:', function() {
    app.question('a', 'b');
    assert(app.questions);
    assert(app.questions.cache);
    assert(app.questions.cache.a);
    assert(app.questions.cache.a.name === 'a');
    assert(app.questions.cache.a.options.message === 'b');
  });

  it('should ask a question and use data value to answer:', function(cb) {
    app.question('a', 'b');
    app.data('a', 'b');

    app.ask('a', function(err, answers) {
      assert(!err);
      assert(answers.a === 'b');

      app.data('a', 'zzz');
      app.ask('a', function(err, answers) {
        assert(!err);
        assert(answers.a === 'zzz');
        cb();
      })
    });
  });

  it('should ask a question and use store value to answer:', function(cb) {
    app.question('a', 'b');
    app.store.set('a', 'c');

    app.ask('a', function(err, answers) {
      assert(!err);
      assert(answers);
      assert(answers.a === 'c');
      app.store.del('a');
      cb();
    })
  });

  it('should ask a question and use config value to answer:', function(cb) {
    app.question('a', 'b');
    app.config.process({data: {a: 'zzz'}});

    app.ask('a', function(err, answer) {
      assert(!err);
      assert(answer);
      assert(answer.a === 'zzz');
      cb();
    });
  });

  it('should prefer data from config over store.data', function(cb) {
    app.question('a', 'b');
    app.config.process({data: {a: 'zzz'}});
    app.store.set('a', 'c');

    app.ask('a', function(err, answer) {
      assert(!err);
      assert(answer);
      assert(answer.a === 'zzz');
      app.store.del('a');
      cb();
    });
  });
});
